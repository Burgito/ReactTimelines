import { useContext } from "react";
import styled from "styled-components";
import { TLElements } from "../constants/TLElements";
import { TimelinesContext } from "./Programmation";
import Timeline from "./Timeline";

const TimelinesContainer = styled.div.attrs({
    "data-testid": "tls-container"
})`
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    height: 100%;
    min-width: 100%;
    overflow-x: auto;
`;
const ScalesContainer = styled.div.attrs({
    "data-testid": "tls-scales-container"
})`
    display: flex;
    flex-direction: row;
    height: 1.5rem;
    margin-bottom: 0.1rem;
    width: fit-content;
`;
const Zoom = styled.div.attrs({
    "data-testid": "tls-zoom-container"
})`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100%;
    min-width: 10rem; // TODO this could be changed for a const so it's the same as the displaysgroup container in tl
    max-width: 10rem; // TODO this could be changed for a const so it's the same as the displaysgroup container in tl
    padding: 0.2rem 0.2rem 0.3rem 0.3rem; // TODO idem ?
    align-items: center;
`;
const Scale = styled.div.attrs({
    "data-testid": "tls-scale"
})`
    width: 100%;
    height: 100%;
    /* padding-left: 0.3rem; */
    /* border: 3px solid transparent; */
`;
const Lines = styled.div.attrs({
    "data-testid": "tls-lines"
})`
    display: flex;
    flex-direction: column;
    position: relative;
`;

const IncZoomBtn = styled.i.attrs({
    className: "fa fa-xs fa-search-plus"
})`
    cursor: pointer;
`;

const DecZoomBtn = styled.i.attrs({
    className: "fa fa-xs fa-search-minus"
})`
    cursor: pointer;
`;

const ZoomSlider = styled.div`
    width: 75%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
`;

const ZoomSlideBar = styled.div`
    width: 100%;
    height: 10%;
    border-radius: 3px;
    background-color: black;
`;

const ZoomSlideButton = styled.div<{offset: number}>`
    width: 4%;
    height: 1rem;
    background-color: black;
    position: absolute;
    top: 0;
    left: ${({ offset }: {offset: number}) => (offset + "%")};
`;

const Timelines: React.FC = () => {
    const { timelines, secondsToPxScale, changeZoom } = useContext(TimelinesContext);
    const fullW = timelines[0] ? timelines[0].maxSeconds*secondsToPxScale : TLElements.MaxDurationSec;
    return <TimelinesContainer>
        <ScalesContainer>
            <Zoom>
                <DecZoomBtn onClick={() => changeZoom(false)} />
                <ZoomSlider>
                    <ZoomSlideBar></ZoomSlideBar>
                    <ZoomSlideButton offset={(secondsToPxScale*100/(TLElements.MaxScale + TLElements.MinScale)) - 2}></ZoomSlideButton>
                </ZoomSlider>
                <IncZoomBtn onClick={() => changeZoom(true)} /></Zoom>
            <Scale style={{ width: fullW }}>
                <svg viewBox={`0 0 ${fullW} 10`} version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <line strokeDasharray={`1, ${secondsToPxScale-1}`} x1="8" y1="9" x2={fullW} y2="9" stroke="black" strokeWidth="5" />
                </svg>
            </Scale>
        </ScalesContainer>
        <Lines>
            {timelines.map(tl => <Timeline
                key={`tl-${tl.id}`} {...{ "timeline": tl }}></Timeline>)}
        </Lines>
    </TimelinesContainer>
};

export default Timelines;