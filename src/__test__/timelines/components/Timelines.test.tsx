import { render, screen } from "@testing-library/react";
import { DragDropContext } from "react-beautiful-dnd";
import { TimelinesContext } from "../../../timelines/components/Programmation";
import Timelines from "../../../timelines/components/Timelines";
import { TLElements } from "../../../timelines/constants/TLElements";
import { TimelineElementType } from "../../../timelines/interfaces/ITimelineElement";
import { ITimeline } from "../../../timelines/interfaces/ITimeline";
import { ITimelineEvent } from "../../../timelines/interfaces/ITimelineEvent";

describe("Timelines component tests", () => {
    // Timelines provided
    const timelines: ITimeline[] = [
        {
            "id": "tl1",
            "events": [{
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
            }],
            "maxSeconds": 3600,
        }
    ]

    const getTimelinesComponent = (tls: ITimeline[]) => <TimelinesContext.Provider
    value={{ timelines: tls, removeEvent: () => { },
        toggleResizeMode: (evt: React.MouseEvent) => {},
        startResizeEvt: (e: React.MouseEvent, evt: ITimelineEvent) => {},
        isResizingEvent: false, changeZoom: (isStretching: boolean) => {},
        secondsToPxScale: TLElements.SecondsToPxDefaultScale }}>
        <DragDropContext onDragEnd={() => { }}>
            <Timelines></Timelines>
        </DragDropContext>);
    </TimelinesContext.Provider>;

    test("Renders without errors", () => {
        render(getTimelinesComponent(timelines));
    });

    test("Has main container", () => {
        render(getTimelinesComponent(timelines));
        expect(screen.getAllByTestId("tls-container")).toBeTruthy();
        expect(screen.getAllByTestId("tls-container").length).toBe(1);
    });

    test("Has Scales container", () => {
        render(getTimelinesComponent(timelines));
        expect(screen.getAllByTestId("tls-scales-container")).toBeTruthy();
        expect(screen.getAllByTestId("tls-scales-container").length).toBe(1);
    });

    test("Has Zoom options container", () => {
        render(getTimelinesComponent(timelines));
        expect(screen.getAllByTestId("tls-zoom-container")).toBeTruthy();
        expect(screen.getAllByTestId("tls-zoom-container").length).toBe(1);
    });

    test("Has Scales div", () => {
        render(getTimelinesComponent(timelines));
        expect(screen.getAllByTestId("tls-scale")).toBeTruthy();
        expect(screen.getAllByTestId("tls-scale").length).toBe(1);
    });

    test("Has Lines", () => {
        render(getTimelinesComponent(timelines));
        expect(screen.getAllByTestId("tls-lines")).toBeTruthy();
        expect(screen.getAllByTestId("tls-lines").length).toBe(1);
    });

    test("Has Good number of timelines", () => {
        render(getTimelinesComponent(timelines));
        expect(screen.getAllByTestId("tl-main-container")).toBeTruthy();
        expect(screen.getAllByTestId("tl-main-container").length).toBe(1);
    });
});