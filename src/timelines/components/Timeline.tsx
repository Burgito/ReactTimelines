import React, { useContext } from "react";
import styled from "styled-components";
import { ITimeline } from "../interfaces/ITimeline";
import { TimelinesContext } from "./Programmation";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ResizableTLEvent from "./ResizableTimelineElement";

const TimelineContainer = styled.div.attrs({
    "data-testid": "tl-main-container"
})`
    display: flex;
    flex-direction: row;
    justify-content: start;
    height: 6.5rem;
    margin-bottom: 1rem;
`;

/* Group */
const GroupTitle = styled.p.attrs({
    "data-testid": "tl-title"
})`
    margin: 0;
`;
const GroupIcon = styled.i<{selected: boolean}>`
    margin-left: 0.3rem;
    cursor: pointer;
    padding: 0.1rem;
    box-shadow: ${({selected}: {selected: boolean}) => selected ? "0 0 2px 1px" : ""}
`;
const GroupIcons = styled.div`
    display: flex;
    flex-direction: row;
`;
const GroupContainer = styled.div.attrs({
    "data-testid": "tl-group-container"
})`
    padding: 0.2rem 0.2rem 0.3rem 0.3rem;
    min-width: 10rem;
    max-width: 10rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 3px solid gray;
`;

/* TL */
const TimelineDiv = styled.div.attrs<{tl: ITimeline, scale: number}>({
    "data-testid": "tl-tl-container"
})`
    min-width: ${({tl, scale}: {tl: ITimeline, scale: number}) => tl.maxSeconds * scale}px;
    width: ${({tl, scale}: {tl: ITimeline, scale: number}) => tl.maxSeconds * scale}px;
    background-color: white;
    display: flex;
    padding: 5px;
    border: 3px solid gray;
`;

interface TimelineProps {
    timeline: ITimeline;
};
const Timeline: React.FC<TimelineProps> = (props) => {
    const { isResizingEvent: isresizingevt, secondsToPxScale,
        toggleResizeMode } = useContext(TimelinesContext);
    return <TimelineContainer>
        <GroupContainer>
            <GroupTitle>Timeline 1</GroupTitle>
            <GroupIcons>
                <GroupIcon data-testid="tl-resz-icon" className="fa fa-lg fa-arrows-alt"
                    onClick={toggleResizeMode} selected={isresizingevt}></GroupIcon>
            </GroupIcons>
        </GroupContainer>
        <Droppable key={`TLDiv-${props.timeline.id}`} droppableId={`${props.timeline.id}`} direction="horizontal">
            {(provided) => (
                <>
                    <TimelineDiv tl={props.timeline} scale={secondsToPxScale} ref={provided.innerRef}>
                        {props.timeline.events.map((ev, index) => (
                            <Draggable key={`${ev.id}`} draggableId={`${ev.id}`} index={index} isDragDisabled={isresizingevt}>
                                {(provided) => (
                                    <ResizableTLEvent innerRef={provided.innerRef}
                                        provided={provided}
                                        key={`${ev.id}-${index}`} evt={ev} timeline={props.timeline}>
                                    </ResizableTLEvent>
                                )}
                            </Draggable>))}
                    </TimelineDiv>
                    {provided.placeholder}
                </>
            )}
        </Droppable>
    </TimelineContainer>;
};

export default Timeline;