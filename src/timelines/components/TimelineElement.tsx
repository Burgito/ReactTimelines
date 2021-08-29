import styled from "styled-components";
import { TimelineElementType, ITimelineElement } from "../interfaces/ITimelineElement";

const GESound = styled.div.attrs({
    "data-testid": "ge-snd"
})`
    padding-left: 0.25rem;
    user-select: none;
    pointer-events: none;
`;

const GEVideo = styled.div.attrs({
    "data-testid": "ge-vid"
})`
    user-select: none;
    pointer-events: none;
`;

interface GEProps {
    ge: ITimelineElement;
    className?: string;
}

const TimelineElement: React.FC<GEProps> = (props) => {
    return <>
        {((props.ge.type === TimelineElementType.Video) &&
        <GEVideo><i className="fa fa-2x fa-video-camera"></i></GEVideo>)
        || ((props.ge.type === TimelineElementType.Sound)
        && <GESound><i className="fa fa-2x fa-bullhorn"></i></GESound>)}
    </>;
};

export default TimelineElement;