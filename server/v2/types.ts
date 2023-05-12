import { Moment } from 'moment';

export type SubmitAnswerRequest = Readonly<{
    answer: string;
}>;

export type Submission = Readonly<{
    id: string;
    submittableId: string;
    submission: string;
    lastUpdated: Moment;
    isCorrect?: boolean;
    isHidden?: boolean;
    response?: string;
}>;

export type UnlockReason = "solve" | "gc"
export type UnlockType = "submittable" | "achievement";

/**
 * @type {Unlock}
 * Represents an ACL for an item in the game. For example,
 * if a team solves a puzzle and that grants access to a new
 * puzzle, that access should be tracked with an Unlock.
 * 
 * @property {string} unlockedItemId - The identifier for the item a team is being granted access to.
 * @property {Moment} unlockTime - A timestamp for when the team was granted access to the item.
 * @property {UnlockReason} unlockReason - The reason the team was granted access to the resource (e.g., automatic vs. manual)
 * @property {UnlockType} unlockType - The type of resource access is being granted to
 * @property {string} unlockSourceId - Optional, indicates the item that triggered granting access.
 */
export type Unlock = Readonly<{
    unlockedItemId: string;
    unlockTime: Moment;    
    unlockReason: UnlockReason;
    unlockType: UnlockType;
    unlockSourceId?: string;
}>;

export type TeamProgress = Readonly<{
    submissions: Submission[];
    unlocks: Unlock[];
}>;

export type Answer =
{
    answerText: string;
    answerResponse?: string;
    isCorrect: boolean;    
    isHidden?: boolean;
    appliesToTeams?: string[];
    unlocks: Unlock[];
};

export type Submittable = Readonly<{
    id: string;
    title: string;
    locked: boolean;
    answers: Answer[];
}>;

// TODO: Split up the event into the 'template' vs
// 'progress' changes. 
export type Store = Readonly<{
    id: string;
    name: string;
    type: string;
    submittables: Submittable[];
    progress: { [teamId: string]: TeamProgress }
}>;