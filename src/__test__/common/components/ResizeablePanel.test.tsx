import { render, screen, act, fireEvent } from "@testing-library/react";
import ResizeablePanel from "../../../common/components/ResizeablePanel";

describe("Horizontal ResizeablePanel tests", () => {
    const movingPanel = <div>Moving</div>;
    const adaptingPanel = <div>Adapting</div>;
    const isHorizontal = true;
    const minSize = 300;

    test("Renders without errors", () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
            movingContent={movingPanel}
            adaptingContent={adaptingPanel}
            minSize={minSize}></ResizeablePanel>);
    });

    test("Has main container", () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
            movingContent={movingPanel}
            adaptingContent={adaptingPanel}
            minSize={minSize}></ResizeablePanel>);
        expect(screen.getAllByTestId("resizeable-container")).toBeTruthy();
        expect(screen.getAllByTestId("resizeable-container").length).toBe(1);
    });

    test("Has moving container", () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
            movingContent={movingPanel}
            adaptingContent={adaptingPanel}
            minSize={minSize}></ResizeablePanel>);
        expect(screen.getAllByTestId("resizeable-moving-container")).toBeTruthy();
        expect(screen.getAllByTestId("resizeable-moving-container").length).toBe(1);
    });

    test("Has adapting container", () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
            movingContent={movingPanel}
            adaptingContent={adaptingPanel}
            minSize={minSize}></ResizeablePanel>);
        expect(screen.getAllByTestId("resizeable-adapting-container")).toBeTruthy();
        expect(screen.getAllByTestId("resizeable-adapting-container").length).toBe(1);
    });

    test("Has divider", () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
            movingContent={movingPanel}
            adaptingContent={adaptingPanel}
            minSize={minSize}></ResizeablePanel>);
        expect(screen.getAllByTestId("resizeable-divider")).toBeTruthy();
        expect(screen.getAllByTestId("resizeable-divider").length).toBe(1);
    });

    test("Has moving content", () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
            movingContent={movingPanel}
            adaptingContent={adaptingPanel}
            minSize={minSize}></ResizeablePanel>);
        expect(screen.getAllByText("Moving")).toBeTruthy();
        expect(screen.getAllByText("Moving").length).toBe(1);
    });

    test("Has adapting content", () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
            movingContent={movingPanel}
            adaptingContent={adaptingPanel}
            minSize={minSize}></ResizeablePanel>);
        expect(screen.getAllByText("Adapting")).toBeTruthy();
        expect(screen.getAllByText("Adapting").length).toBe(1);
    });

    test("Change left size on mousedown + mousemove + mouseup", async () => {
        await act(async () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
                movingContent={movingPanel}
                adaptingContent={adaptingPanel}
                minSize={minSize}></ResizeablePanel>);
        });

        fireEvent.mouseDown(screen.getByTestId("resizeable-divider"));
        fireEvent.mouseMove(screen.getByTestId("resizeable-container"), {clientX: 400});
        fireEvent.mouseUp(screen.getByTestId("resizeable-divider"));
        expect(screen.getByTestId("resizeable-moving-container").style.width).toBe("400px");
    });

    test("Left size does not go under minsize", async () => {
        await act(async () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
                movingContent={movingPanel}
                adaptingContent={adaptingPanel}
                minSize={minSize}></ResizeablePanel>);
        });

        fireEvent.mouseDown(screen.getByTestId("resizeable-divider"));
        fireEvent.mouseMove(screen.getByTestId("resizeable-container"), {clientX: 100});
        fireEvent.mouseUp(screen.getByTestId("resizeable-divider"));
        expect(screen.getByTestId("resizeable-moving-container").style.width).toBe(minSize + "px");
    });
});

describe("Vertical ResizeablePanel tests", () => {
    const movingPanel = <div>Moving</div>;
    const adaptingPanel = <div>Adapting</div>;
    const isHorizontal = false;
    const minSize = 300;

    test("Renders without errors", () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
            movingContent={movingPanel}
            adaptingContent={adaptingPanel}
            minSize={minSize}></ResizeablePanel>);
    });

    test("Has main container", () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
            movingContent={movingPanel}
            adaptingContent={adaptingPanel}
            minSize={minSize}></ResizeablePanel>);
        expect(screen.getAllByTestId("resizeable-container")).toBeTruthy();
        expect(screen.getAllByTestId("resizeable-container").length).toBe(1);
    });

    test("Has moving container", () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
            movingContent={movingPanel}
            adaptingContent={adaptingPanel}
            minSize={minSize}></ResizeablePanel>);
        expect(screen.getAllByTestId("resizeable-moving-container")).toBeTruthy();
        expect(screen.getAllByTestId("resizeable-moving-container").length).toBe(1);
    });

    test("Has adapting container", () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
            movingContent={movingPanel}
            adaptingContent={adaptingPanel}
            minSize={minSize}></ResizeablePanel>);
        expect(screen.getAllByTestId("resizeable-adapting-container")).toBeTruthy();
        expect(screen.getAllByTestId("resizeable-adapting-container").length).toBe(1);
    });

    test("Has divider", () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
            movingContent={movingPanel}
            adaptingContent={adaptingPanel}
            minSize={minSize}></ResizeablePanel>);
        expect(screen.getAllByTestId("resizeable-divider")).toBeTruthy();
        expect(screen.getAllByTestId("resizeable-divider").length).toBe(1);
    });

    test("Has moving content", () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
            movingContent={movingPanel}
            adaptingContent={adaptingPanel}
            minSize={minSize}></ResizeablePanel>);
        expect(screen.getAllByText("Moving")).toBeTruthy();
        expect(screen.getAllByText("Moving").length).toBe(1);
    });

    test("Has adapting content", () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
            movingContent={movingPanel}
            adaptingContent={adaptingPanel}
            minSize={minSize}></ResizeablePanel>);
        expect(screen.getAllByText("Adapting")).toBeTruthy();
        expect(screen.getAllByText("Adapting").length).toBe(1);
    });

    test("Change top size on mousedown + mousemove + mouseup", async () => {
        await act(async () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
                movingContent={movingPanel}
                adaptingContent={adaptingPanel}
                minSize={minSize}></ResizeablePanel>);
        });

        fireEvent.mouseDown(screen.getByTestId("resizeable-divider"));
        fireEvent.mouseMove(screen.getByTestId("resizeable-container"), {clientY: 400});
        fireEvent.mouseUp(screen.getByTestId("resizeable-divider"));
        expect(screen.getByTestId("resizeable-moving-container").style.height).toBe("400px");
    });

    test("Top size does not go under minsize", async () => {
        await act(async () => {
        render(<ResizeablePanel isHorizontal={isHorizontal}
                movingContent={movingPanel}
                adaptingContent={adaptingPanel}
                minSize={minSize}></ResizeablePanel>);
        });

        fireEvent.mouseDown(screen.getByTestId("resizeable-divider"));
        fireEvent.mouseMove(screen.getByTestId("resizeable-container"), {clientY: 100});
        fireEvent.mouseUp(screen.getByTestId("resizeable-divider"));
        expect(screen.getByTestId("resizeable-moving-container").style.height).toBe(minSize + "px");
    });
});