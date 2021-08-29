import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";
import { TimelineElements, Sizes, TLElements } from "../constants/TLElements";
import ResizeablePanel from "../../common/components/ResizeablePanel";
import TimelineElementsPanel from "./TimelineElementsPanel";
import TimeLinePanel from "./TimelinePanel";
import { DropResult, DragDropContext } from "react-beautiful-dnd";
import Repository from "../../common/repository/repository";
import { ITimelineElement } from "../interfaces/ITimelineElement";
import Loader from "../../common/components/Loader";
import { LoaderType } from "../../common/constants/Loader";
import { ITimeline } from "../interfaces/ITimeline";
import { ITimelineEvent } from "../interfaces/ITimelineEvent";
import { ArrayManipulation } from "../../common/utils/Array";
import { useCallback } from "react";

const ProgrammationContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    height:100%;
`;

const ProgrammationTimeLineContainer = styled(TimeLinePanel)`
    display:flex;
    background-color: rgba(240,240,240,0.2);
    height: 100%;
    min-height: ${Sizes.TimeLineMinHeight}px;
    flex-direction: column;
`;

const TimelineElementsStyledPanel = styled(TimelineElementsPanel)`
    display: flex;
    background-color: white;
    height: 100%;
    min-height: ${Sizes.TimelineElementsMinHeight}px;
    min-width: ${Sizes.TimelineElementsMinWidth}px;
    padding: 0.5rem;
`;

const defaultTLContext = {
    timelines: [] as ITimeline[],
    removeEvent: (evt: ITimelineEvent) => { },
    toggleResizeMode: (evt: React.MouseEvent) => { },
    startResizeEvt: (evt: React.MouseEvent, tlEvt: ITimelineEvent) => { },
    isResizingEvent: false,
    secondsToPxScale: TLElements.SecondsToPxDefaultScale,
    changeZoom: (inc: boolean) => { }
};
export const TimelinesContext = React.createContext(defaultTLContext);

export const Programmation: React.FC = () => {
    const [timelineElements, setTimelineElements] = useState([] as ITimelineElement[]);
    const [resultLoaded, setResultLoaded] = useState(false);
    const [timelines, setTimelines] = useState([] as ITimeline[]);
    const [isResizeMode, setIsResizeMode] = useState(true);
    const [scale, setScale] = useState(TLElements.SecondsToPxDefaultScale);
    const evtXMouseDown = useRef(null as (number | null));
    const evtBeingResized = useRef(null as unknown as ITimelineEvent);

    useEffect(() => {
        setResultLoaded(false);
        async function retrieveTimelineElements() {
            const repo = new Repository();
            const ge = repo.getTimelineElements();
            const tl = repo.getTimelines();
            setTimelineElements(ge);
            setTimelines([...tl]);
            setResultLoaded(true);
        }

        retrieveTimelineElements();
    }, []);

    function changeScale(inc: boolean) {
        if (inc && (scale + TLElements.ZoomScaleStep) <= TLElements.MaxScale)
            setScale(scale + TLElements.ZoomScaleStep);
        else if (!inc && (scale - TLElements.ZoomScaleStep) >= TLElements.MinScale)
            setScale(scale - TLElements.ZoomScaleStep);
    }

    function removeEventFromTL(tlEvt: ITimelineEvent) {
        const tlIndexInState = timelines.findIndex(t => t.id === tlEvt.timelineId);
        if (tlIndexInState < 0)
            return;
        const tl = timelines[tlIndexInState];
        tl.events = tl.events.filter(e => e.id !== tlEvt.id);
        timelines[tlIndexInState] = { ...tl };
        setTimelines([...timelines]);
    }

    function onDragEnd(result: DropResult) {
        const { source, destination } = result;
        if (!destination)
            return;

        const destTLIndex = timelines.findIndex(t => t.id === destination.droppableId);
        if (destTLIndex < 0)
            return;
        let events = timelines[destTLIndex].events;
        // Dropping from TLEvts to TL
        if (source.droppableId === TimelineElements.DroppableId) {
            const evt: ITimelineEvent = {
                id: uuidv4(),
                timelineElement: timelineElements[source.index],
                nbSeconds: TLElements.DefaultDurationSec,
                index: destination.index,
                timelineId: timelines[destTLIndex].id
            };
            events.splice(destination.index, 0, { ...evt });
        }
        // Dropping from one TL to the other
        else if (source.droppableId !== destination.droppableId) {
            const sourceTLIndex = timelines.findIndex(t => t.id === source.droppableId);
            if (sourceTLIndex < 0 || destTLIndex < 0)
                return;

            // Setting id before moving, because it might be harder to find the event after ?
            // Not sure if destination.index is that reliable
            timelines[sourceTLIndex].events[source.index].timelineId = timelines[destTLIndex].id;
            ArrayManipulation.move<ITimelineEvent>(timelines[sourceTLIndex].events,
                events, source.index, destination.index);

        }
        // Reordering in TL
        else {
            ArrayManipulation.reorder<ITimelineEvent>(events, source.index, destination.index);
        }
        timelines[destTLIndex].events = [...events];
        setTimelines([...timelines]);
    }

    function startResizeEvt(evt: React.MouseEvent, tlEvt: ITimelineEvent) {
        if (isResizeMode) {
            evtXMouseDown.current = evt.clientX;
            evtBeingResized.current = tlEvt;
        } else {
            evtXMouseDown.current = null;
        }
    }

    function toggleResizeMode(evt: React.MouseEvent) {
        setIsResizeMode(!isResizeMode);
    }

    const resizeEvt = useCallback((evt: React.MouseEvent) => {
        if (isResizeMode && evtXMouseDown.current != null) {
            const tlIndex = timelines.findIndex(t => t.id === evtBeingResized.current.timelineId);
            if (tlIndex < 0)
                return;

            const evtIndex = timelines[tlIndex].events.findIndex(e => e.id === evtBeingResized.current.id);
            if (evtIndex < 0)
                return;

            // TODO This could be enhanced by finding the closest snap instead of always taking the "floor"
            const stretching = evt.clientX - evtXMouseDown.current > 0;
            const val = Math.floor(Math.abs(evt.clientX - evtXMouseDown.current) / scale);
            const computed = (timelines[tlIndex].events[evtIndex].nbSeconds) + (stretching ? val : -val);
            const newDuration = computed < TLElements.MinDurationSec ? TLElements.MinDurationSec
                : computed > TLElements.MaxDurationSec ? TLElements.MaxDurationSec
                    : computed;
            // TODO /!\ The total duration of the timeline regarding all the events shall also be considered
            //      If changing the size of the event means that the total duration of all events is bigger than
            //      The total duration of the TL, then it can not be done
            if (newDuration !== timelines[tlIndex].events[evtIndex].nbSeconds) {
                timelines[tlIndex].events[evtIndex].nbSeconds = newDuration;
                evtXMouseDown.current = evt.clientX;
                setTimelines([...timelines]);
            }
        }
    }, [isResizeMode, timelines, scale]);

    function onMouseUp() {
        if (isResizeMode) {
            evtXMouseDown.current = null;
        }
    }

    return <TimelinesContext.Provider value={{
        timelines: timelines,
        removeEvent: removeEventFromTL,
        toggleResizeMode: toggleResizeMode,
        startResizeEvt: startResizeEvt, isResizingEvent: isResizeMode,
        secondsToPxScale: scale, changeZoom: changeScale
    }}>
        <ProgrammationContainer
            onMouseMove={resizeEvt}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >
            {!resultLoaded && <Loader loaderType={LoaderType.Sonar} isFullScreenLoader={true} />}
            <DragDropContext onDragEnd={onDragEnd} >
                <ResizeablePanel isHorizontal={false}
                    movingContent={<TimelineElementsStyledPanel
                            timelineElements={timelineElements}>
                        </TimelineElementsStyledPanel>}
                    adaptingContent={<ProgrammationTimeLineContainer>
                    </ProgrammationTimeLineContainer>}
                    minSize={Sizes.TimelineElementsMinHeight} >
                </ResizeablePanel>
            </DragDropContext>
        </ProgrammationContainer>
    </TimelinesContext.Provider>
};

export default Programmation;