import React from "react";
import styled from "styled-components";
import { ITimelineElement } from "../interfaces/ITimelineElement";
import { Draggable, Droppable, DraggingStyle } from "react-beautiful-dnd";
import TimelineElement from "./TimelineElement";

const GEContainer = styled.div.attrs({
    "data-testid": "ge-panel-container"
})`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const GEItemContainer = styled.div.attrs({
    "data-testid": "ge-panel-itemcontainer"
})`
    max-height: 90px;
    height: 100%;
`;

const ElementsContainer = styled.div.attrs({
    "data-testid": "ge-panel-elements-container"
})`
    display: flex;
    height: 100%;
    overflow-y: auto;
    flex-direction: row;
    justify-content: space-evenly;
    padding-top: 1rem;
`;

interface GEProps {
    timelineElements: ITimelineElement[];
}

const TimelineElementsPanel: React.FC<GEProps> = (props) => {
    return <Droppable droppableId="TimelineElements" isDropDisabled={true} direction="horizontal">
        {(provided, snapshot) => (
            <GEContainer {...props}
                ref={provided.innerRef}
                {...provided.droppableProps}
                data-isdraggingover={snapshot.isDraggingOver} >
                <ElementsContainer>
                    {props.timelineElements?.map((ge, index) => (
                        <Draggable key={`${ge.id}-${ge}`} draggableId={`${ge.id}-${ge}`} index={index} >
                            {(provided, snapshot) => (
                                <>
                                <GEItemContainer ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                        ...provided.draggableProps.style,
                                        transform: snapshot.isDragging
                                          ? provided.draggableProps.style?.transform
                                          : 'translate(0px, 0px)',
                                    }} >
                                    {<TimelineElement ge={ge}></TimelineElement>}
                                </GEItemContainer>
                                {snapshot.isDragging && <GEItemContainer style={{ width: (provided.draggableProps.style as DraggingStyle)?.width,transform: 'none !important' }}>
                                {<TimelineElement ge={ge}></TimelineElement>}

                            </GEItemContainer>}
                            </>)}
                        </Draggable>
                    ))}
                </ElementsContainer>
                {provided.placeholder}
            </GEContainer>
        )}
    </Droppable>;
};

export default TimelineElementsPanel;