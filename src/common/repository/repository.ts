import TLEvts from './TLElts.json';
import TL from './Timelines.json';
import { ITimelineElement } from "../../timelines/interfaces/ITimelineElement";
import { ITimeline } from "../../timelines/interfaces/ITimeline";

export class Repository {
    public getTimelineElements = () =>
        TLEvts as ITimelineElement[];
    public getTimelines = () =>
        TL as ITimeline[];
}

export default Repository;