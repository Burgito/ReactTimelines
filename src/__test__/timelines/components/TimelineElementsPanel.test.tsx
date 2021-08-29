import { render, screen, act } from "@testing-library/react";
import { DragDropContext } from "react-beautiful-dnd";
import TimelineElementsPanel from "../../../timelines/components/TimelineElementsPanel";
import { TimelineElementType, ITimelineElement } from "../../../timelines/interfaces/ITimelineElement";

describe("TLEvts Panel tests", () => {
    const initialGES: ITimelineElement[] = [
        {
            "id": "abc1",
            "type": TimelineElementType.Image,
            "url": "http://fakeImageUrl"
        },
        {
            "id": "abc2",
            "type": TimelineElementType.Sound,
            "url": "http://fakeSoundurl"
        },
        {
            "id": "abc3",
            "type": TimelineElementType.Video,
            "url": "http://fakeVideourl"
        }
    ];
    let ges = [...initialGES];

    test("Render without errors", () => {
        render(<DragDropContext onDragEnd={() => { }}>
            <TimelineElementsPanel timelineElements={ges} ></TimelineElementsPanel>
        </DragDropContext>);
    });

    test("Renders container", async () => {
        await act(async () => {
            render(<DragDropContext onDragEnd={() => { }}>
                <TimelineElementsPanel timelineElements={ges} ></TimelineElementsPanel>
            </DragDropContext>);
        });
        expect(screen.getAllByTestId("ge-panel-container")).toBeTruthy();
        expect(screen.getAllByTestId("ge-panel-container").length).toBe(1);
    });

    test("Contains timeline elements", async () => {
        await act(async () => {
            render(<DragDropContext onDragEnd={() => { }}>
                <TimelineElementsPanel timelineElements={ges} ></TimelineElementsPanel>
            </DragDropContext>);
        });
        expect(screen.getAllByTestId("ge-panel-itemcontainer")).toBeTruthy();
        expect(screen.getAllByTestId("ge-panel-itemcontainer").length).toBe(3);
    });
});