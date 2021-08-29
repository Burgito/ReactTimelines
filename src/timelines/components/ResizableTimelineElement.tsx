import React, { useContext } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITimeline } from "../interfaces/ITimeline";
import { ITimelineEvent } from "../interfaces/ITimelineEvent";
import TimelineElement from "./TimelineElement";
import { TimelinesContext } from "./Programmation";

/* TL Event */
interface TLEventProps {
    timeline: ITimeline;
    evt: ITimelineEvent;
    innerRef: any;
    provided: DraggableProvided;
};

const Handler = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    width: 10px;
    background-color: black;
    cursor: col-resize;
    padding: 0;
`;

interface IContainerProps {
    evt: ITimelineEvent;
    scale: number;
}
const Container = styled.div.attrs(({ evt, scale }: IContainerProps) => ({
    "data-testid": "tl-event-container",
    "id": evt.id
}))`
    padding: 0.2rem 0.5rem;
    background-color: lightskyblue;
    max-height: 6rem;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    user-select: none;
    min-width: ${({ evt, scale }: IContainerProps) => ((evt.nbSeconds * scale) + "px")};
    max-width: ${({ evt, scale }: IContainerProps) => ((evt.nbSeconds * scale) + "px")};
    box-shadow: 0 0 7px -1px;
    justify-content: space-between;
`;

const ActionsAndGE = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-shrink: 1;
    min-height: 0;
`;

const Duration = styled.div.attrs({
    className: "small"
})`
    display: flex;
    flex-shrink: 1;
`;

const RMTLEIcon = styled.i.attrs({
    className: "fa fa-lg fa-close",
    "data-testid": "tl-event-remove-btn"
})`
    cursor: pointer;
`;

const ActionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    i {
        cursor: pointer;
    }
`;

const ResizableTLEvent: React.FC<TLEventProps> = (props) => {
    const { provided, evt } = props;
    const { removeEvent: removeevent, secondsToPxScale,
        isResizingEvent: isresizingevt, startResizeEvt } = useContext(TimelinesContext);

    return <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={props.innerRef}
        {...props} evt={evt} scale={secondsToPxScale}>
        <ActionsAndGE>
            <ActionsContainer>
                <RMTLEIcon onClick={() => removeevent(evt)}></RMTLEIcon>
            </ActionsContainer>
            <TimelineElement className="ms-1" ge={evt.timelineElement}></TimelineElement>
        </ActionsAndGE>
        <Duration>
            Duration: {evt.nbSeconds}s
        </Duration>
        {isresizingevt && <Handler style={{ right: 0 }} onMouseDown={(e) => startResizeEvt(e, evt)}></Handler>}
    </Container>
};

export default ResizableTLEvent;