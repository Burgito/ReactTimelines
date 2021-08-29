import { ITimelineElement } from "./ITimelineElement";

export interface ITimelineEvent {
    id: string;
    timelineElement: ITimelineElement;
    nbSeconds: number;
    index: number;
    timelineId: string;
};