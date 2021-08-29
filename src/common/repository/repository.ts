import GE from './TLElts.json';
import TL from './Timelines.json';
import { ITimelineElement } from "../../timelines/interfaces/ITimelineElement";
import { ITimeline } from "../../timelines/interfaces/ITimeline";

export class Repository {
    public getTimelineElements = () =>
        GE as ITimelineElement[];
    public getTimelines = () =>
        TL as ITimeline[];
}

export default Repository;