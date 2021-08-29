import { render, screen, fireEvent } from "@testing-library/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TimelinesContext } from "../../../timelines/components/Programmation";
import Timeline from "../../../timelines/components/Timeline";
import { TLElements } from "../../../timelines/constants/TLElements";
import { TimelineElementType } from "../../../timelines/interfaces/ITimelineElement";
import { ITimeline } from "../../../timelines/interfaces/ITimeline";
import { ITimelineEvent } from "../../../timelines/interfaces/ITimelineEvent";
import { ArrayManipulation } from "../../../common/utils/Array";
import { horizontalDrag } from "react-beautiful-dnd-tester";
import React from "react";

describe("Timeline component tests", () => {
    // Timelines provided
    const timelines: ITimeline[] = [
        {
            "id": "tl1",
            "events": [],
            "maxSeconds": 3600,
        }
    ]
    // Events
    const events: ITimelineEvent[] = [
        {
            id: "evt1",
            timelineElement: {
                "id": "abc1",
                "type": TimelineElementType.Sound,
                "url": ""
            },
            nbSeconds: 60,
            index: 0,
            timelineId: "tl1"
        },
        {
            id: "evt2",
            timelineElement: {
                "id": "abc2",
                "type": TimelineElementType.Video,
                "url": ""
            },
            nbSeconds: 80,
            index: 1,
            timelineId: "tl1"
        }
    ]
    // Timeline props
    const timeline = timelines[0];

    function removeEventFromTL(tlEvt: ITimelineEvent) {
        const tlIndexInState = timelines.findIndex(t => t.id === tlEvt.timelineId);
        if (tlIndexInState < 0)
            return;
        const tl = timelines[tlIndexInState];
        tl.events = tl.events.filter(e => e.id !== tlEvt.id);
        timelines[tlIndexInState] = { ...tl };
    }

    function onDragEnd(result: DropResult) {
        const { source, destination } = result;
        if (!destination) {
            console.log("No dest!");
            return;
        }

        const destTLIndex = timelines.findIndex(t => t.id === destination.droppableId);
        if (destTLIndex < 0) {
            console.log("No destindex!");
            return;
        }
        let newEvts = timelines[destTLIndex].events;
        ArrayManipulation.reorder<ITimelineEvent>(newEvts, source.index, destination.index);
        timelines[destTLIndex].events = [...newEvts];
        timeline.events = [...newEvts];
    }

    const getTimelineComponent = (tls: ITimeline[]) => <TimelinesContext.Provider
        value={{ timelines: tls, removeEvent: removeEventFromTL,
            toggleResizeMode: (evt: React.MouseEvent) => {},
            startResizeEvt: (e: React.MouseEvent, evt: ITimelineEvent) => {},
            isResizingEvent: false, changeZoom: (isStretching: boolean) => {},
            secondsToPxScale: TLElements.SecondsToPxDefaultScale }}>
        <DragDropContext onDragEnd={onDragEnd}>
            <Timeline timeline={timeline}></Timeline>
        </DragDropContext>);
    </TimelinesContext.Provider>;

    test("Renders without errors", () => {
        render(getTimelineComponent(timelines));
    });

    test("Has main container", () => {
        render(getTimelineComponent(timelines));

        expect(screen.getAllByTestId("tl-main-container")).toBeTruthy();
        expect(screen.getAllByTestId("tl-main-container").length).toBe(1);
    });

    test("Has group container", () => {
        render(getTimelineComponent(timelines));

        expect(screen.getAllByTestId("tl-group-container")).toBeTruthy();
        expect(screen.getAllByTestId("tl-group-container").length).toBe(1);
    });

    test("Has timeline container", () => {
        render(getTimelineComponent(timelines));

        expect(screen.getAllByTestId("tl-tl-container")).toBeTruthy();
        expect(screen.getAllByTestId("tl-tl-container").length).toBe(1);
    });

    test("Has title", () => {
        render(getTimelineComponent(timelines));

        expect(screen.getAllByTestId("tl-title")).toBeTruthy();
        expect(screen.getAllByTestId("tl-title").length).toBe(1);
    });

    test("Has events containers", () => {
        timelines[0].events = events;
        timeline.events = events;
        render(getTimelineComponent(timelines));

        expect(screen.getAllByTestId("tl-event-container")).toBeTruthy();
        expect(screen.getAllByTestId("tl-event-container").length).toBe(2);
    });

    test("Event has remove button", () => {
        timelines[0].events = [events[0]];
        timeline.events = [events[0]];
        render(getTimelineComponent(timelines));

        expect(screen.getAllByTestId("tl-event-remove-btn")).toBeTruthy();
        expect(screen.getAllByTestId("tl-event-remove-btn").length).toBe(1);
    });

    test("Event has Timeline Element", () => {
        timelines[0].events = [events[0]];
        timeline.events = [events[0]];
        render(getTimelineComponent(timelines));

        expect(screen.getAllByTestId("ge-snd")).toBeTruthy();
        expect(screen.getAllByTestId("ge-snd").length).toBe(1);
    });

    test("Event has correct size regarding nbSeconds", () => {
        timelines[0].events = [events[0]];
        timeline.events = [events[0]];
        render(getTimelineComponent(timelines));

        const computedStyle = window.getComputedStyle(screen.getAllByTestId("tl-event-container")[0]);
        expect(computedStyle.minWidth).toBe(`${events[0].nbSeconds * TLElements.SecondsToPxDefaultScale}px`);
        expect(computedStyle.maxWidth).toBe(`${events[0].nbSeconds * TLElements.SecondsToPxDefaultScale}px`);
        expect(computedStyle.border).toBeFalsy();
    });

    test("Event is removed on remove button click", () => {
        timelines[0].events = events;
        timeline.events = events;
        const { rerender } = render(getTimelineComponent(timelines));
        fireEvent.click(screen.getAllByTestId("tl-event-remove-btn")[0]);
        expect(timelines[0].events.length).toBe(1);
        expect(timeline.events.length).toBe(1);
        rerender(getTimelineComponent(timelines));
        expect(screen.getAllByTestId("tl-event-container")).toBeTruthy();
        expect(screen.getAllByTestId("tl-event-container").length).toBe(1);
    });

    test("Can move event in timeline", () => {
        timelines[0].events = events;
        timeline.events = events;
        const initialFirstEventId = timeline.events[0].id;
        const initialSecondEventId = timeline.events[1].id;
        render(getTimelineComponent(timelines));
        let second = screen.getAllByTestId("tl-event-container")[1];
        let first = screen.getAllByTestId("tl-event-container")[0];
        horizontalDrag(second).inFrontOf(first);
        expect(timeline.events[0].id).toBe(initialSecondEventId);
        expect(timeline.events[1].id).toBe(initialFirstEventId);
        expect(timelines[0].events[0].id).toBe(initialSecondEventId);
        expect(timelines[0].events[1].id).toBe(initialFirstEventId);
    });

    test("Move events in timeline reorders components", () => {
        timelines[0].events = events;
        timeline.events = events;
        render(getTimelineComponent(timelines));
        let second = screen.getAllByTestId("tl-event-container")[1];
        let first = screen.getAllByTestId("tl-event-container")[0];
        horizontalDrag(second).inFrontOf(first);
        expect(screen.getAllByTestId("tl-event-container")[1].innerHTML).toBe(first.innerHTML);
        expect(screen.getAllByTestId("tl-event-container")[0].innerHTML).toBe(second.innerHTML);
    });
});