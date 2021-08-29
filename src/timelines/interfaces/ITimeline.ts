import { ITimelineEvent } from "./ITimelineEvent";

export interface ITimeline {
    id: string;
    maxSeconds: number;
    locked?: boolean;
    events: ITimelineEvent[];
};