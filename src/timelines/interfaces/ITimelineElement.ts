export enum TimelineElementType {
    Video = "Video",
    Image = "Image",
    Sound = "Sound"
};

export interface ITimelineElement {
    id: string;
    type: TimelineElementType;
    url: string;
};