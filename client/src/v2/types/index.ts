import { Moment } from "moment";

// TODO: How to manage hiding fields from clients - does leaving them undefined hide it in fiddler?


export type EventType = "beta" | "rc" | "rtm";

export type Event =
{
    id: string;
    name: string;
    type: EventType;
    startTime?: Moment;
    endTime?: Moment;
    submittables: Submittable[];
    solveData: SolveData[];
};

export type Submittable =
{
    title: string;
};

export type Answer =
{
    answerText: string;
    answerResponse?: string;
    isCorrect: boolean;    
    isHidden?: boolean;
    unlockTime?: Moment;
};

// TODO: Data should no longer live in the Database, so content should generally
// be hyperlinks out to the appropriate endpoint. That said, content-type can
// be a guideline for how we display it (inline image vs youtube embed)
export type Content =
{
    type: string;
    value: string;
};

export type SolveData =
{
    teamId: string;
    teamName: string;
    startTime?: Moment;
    solveTime?: Moment;
    isSkipped?: boolean;
};