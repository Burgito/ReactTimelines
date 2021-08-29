import React, { createRef, useEffect, useState } from "react";
import styled from "styled-components";

interface ResizeablePanelProps {
    movingContent: React.ReactElement;
    adaptingContent: React.ReactElement;
    minSize: number;
    isHorizontal: boolean;
}

const ResizeablePanelContainer = styled.div<{ isHorizontal: boolean }>`
    height: 100%;
    display: flex;
    ${({ isHorizontal }) => isHorizontal && `
        flex-direction: row;
        align-items: flex-start;
    `}
    ${({ isHorizontal }) => !isHorizontal && `
        width: 100%;
        flex-direction: column;
        align-items: flex-end;
    `}
`;

const ResizableDivider = styled.div<{ isHorizontal: boolean }>`
    ${({ isHorizontal }) => isHorizontal && `
        width: 2px;
        height: 100%;
    `}
    ${({ isHorizontal }) => !isHorizontal && `
        height: 1px;
        width: 100%;
    `}
    border: 2px solid #888888;
`;

const DividerHitBox = styled.div<{ isHorizontal: boolean }>`
    align-self: stretch;
    display: flex;
    align-items: center;
    ${({ isHorizontal }) => isHorizontal && `
        padding: 0 0.5rem;
        cursor: col-resize;
    `}
    ${({ isHorizontal }) => !isHorizontal && `
        padding: 0.5rem 0rem;
        cursor: row-resize;
    `}
`;

const ResizeableAdaptingPane = styled.div<{ isHorizontal: boolean }>`
    flex: 1;
    ${({ isHorizontal }) => isHorizontal && `
        height: inherit;
    `}
    ${({ isHorizontal }) => !isHorizontal && `
        width: inherit;
    `}
`;

const ResizeableMovingPanelDiv = styled.div<{ isHorizontal: boolean }>`
    ${({ isHorizontal }) => isHorizontal && `
        height: inherit;
    `}
    ${({ isHorizontal }) => !isHorizontal && `
        width: inherit;
    `}
`;

interface MovingPanelProps {
    movingSize: number | undefined;
    setMovingSize: (value: number) => void;
    isHorizontal: boolean;
};

const MovingPanel: React.FC<MovingPanelProps> = (props) => {
    const movingRef = createRef<HTMLDivElement>();
    useEffect(() => {
        if (movingRef.current) {
            if (!props.movingSize) {
                props.setMovingSize(props.isHorizontal ? movingRef.current?.clientWidth : movingRef.current?.clientHeight);
                return;
            }
            if (props.isHorizontal)
                movingRef.current.style.width = `${props.movingSize}px`;
            else
                movingRef.current.style.height = `${props.movingSize}px`;
        }
    }, [movingRef, props]);
    return <ResizeableMovingPanelDiv data-testid="resizeable-moving-container"
        isHorizontal={props.isHorizontal} ref={movingRef}>{props.children}</ResizeableMovingPanelDiv>;
};

export const ResizeablePanel: React.FC<ResizeablePanelProps> = (props) => {
    const [movingSize, setMovingSize] = useState<undefined | number>(undefined);
    const [separatorPosition, setSeparatorPosition] = useState<undefined | number>(undefined);
    const [isDragging, setIsDragging] = useState(false);

    const onMouseDown = (e: React.MouseEvent) => {
        setSeparatorPosition(props.isHorizontal ? e.clientX : e.clientY);
        setIsDragging(true);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (isDragging && movingSize !== undefined && separatorPosition !== undefined) {
            let movingS = movingSize + (props.isHorizontal ? e.clientX : e.clientY) - separatorPosition;
            if (movingS < props.minSize)
                movingS = props.minSize;
            setSeparatorPosition(props.isHorizontal ? e.clientX : e.clientY);
            setMovingSize(movingS);
        }
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    return <ResizeablePanelContainer isHorizontal={props.isHorizontal} onMouseMove={onMouseMove} onMouseUp={onMouseUp} data-testid="resizeable-container">
        <MovingPanel isHorizontal={props.isHorizontal} movingSize={movingSize} setMovingSize={setMovingSize}>
            {props.movingContent}
        </MovingPanel>
        <DividerHitBox isHorizontal={props.isHorizontal} onMouseDown={onMouseDown} data-testid="resizeable-divider">
            <ResizableDivider isHorizontal={props.isHorizontal}></ResizableDivider>
        </DividerHitBox>
        <ResizeableAdaptingPane isHorizontal={props.isHorizontal} data-testid="resizeable-adapting-container">
            {props.adaptingContent}
        </ResizeableAdaptingPane>
    </ResizeablePanelContainer>;
};

export default ResizeablePanel;