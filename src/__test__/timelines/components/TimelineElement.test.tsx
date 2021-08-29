import { render, screen, act } from "@testing-library/react";
import TimelineElement from "../../../timelines/components/TimelineElement";
import { TimelineElementType } from "../../../timelines/interfaces/ITimelineElement";

describe("TimelineElement test", () => {
    test("Renders without errors on all types", () => {
        const geImg = { id: "", type: TimelineElementType.Image, url: "" };
        const geSnd = { id: "", type: TimelineElementType.Sound, url: "" };
        const geVid = { id: "", type: TimelineElementType.Video, url: "" };
        render(<TimelineElement ge={geImg}></TimelineElement>);
        render(<TimelineElement ge={geSnd}></TimelineElement>);
        render(<TimelineElement ge={geVid}></TimelineElement>);
    });

    test("Renders Sound type", async () => {
        const ge = { id: "", type: TimelineElementType.Sound, url: "" };
        await act(async () => {
            render(<TimelineElement ge={ge}></TimelineElement>);
        });
        expect(screen.getAllByTestId("ge-snd")).toBeTruthy();
        expect(screen.getAllByTestId("ge-snd").length).toBe(1);
    });

    test("Renders Video type", async () => {
        const ge = { id: "", type: TimelineElementType.Video, url: "" };
        await act(async () => {
            render(<TimelineElement ge={ge}></TimelineElement>);
        });
        expect(screen.getAllByTestId("ge-vid")).toBeTruthy();
        expect(screen.getAllByTestId("ge-vid").length).toBe(1);
    });
});