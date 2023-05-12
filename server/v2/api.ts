import { Draft, produce } from 'immer';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { Submission, Store, TeamProgress } from "./types";

export interface GameControl {
    submitAnswer(submission: string, teamId: string, submittableId: string): TeamProgress;
};

const initialTeamState: TeamProgress = {
    submissions: [],
    unlocks: [],
}

export let store: Store = 
{
    id: "testevent",
    name: "Game Control Test",
    type: "beta",
    submittables: [
        {
            id: "puzzle-1",
            title: "Puzzle 1",
            locked: true,
            answers: []
        }
    ],
    progress: {
        ["team-red"]: initialTeamState
    },
};

const processSubmission = (eventState: Draft<Store>, submission: string, teamId: string, submittableId: string) => {   
    const targetSubmittable = eventState.submittables.find(x => x.id === submittableId);
    const currentTeam = eventState.progress[teamId];

    if (!currentTeam) {
        throw new Error("InvalidTeamId");
    } else if (!targetSubmittable) {        
        throw new Error("InvalidSubmittableId");
    } else if (targetSubmittable.locked && !currentTeam.unlocks.find(x => x.unlockedItemId === submittableId)) {
        throw new Error("InvalidAccess");
    } else if (currentTeam.submissions.find(x => x.isCorrect && x.submittableId === submittableId)) {
        throw new Error("PuzzleAlreadySolved");
    }

    let newSubmission: Submission = {
        id: uuidv4(),
        submission,
        submittableId,
        lastUpdated: moment.utc()
    };

    // Check if this is a correct submission
    const applicableAnswer = targetSubmittable.answers.find(x => x.answerText === submission);
    if (applicableAnswer) {
        newSubmission = {
            ...newSubmission,
            isCorrect: applicableAnswer.isCorrect,
            isHidden: applicableAnswer.isHidden,
            response: applicableAnswer.answerResponse,
        };

        if (applicableAnswer.isCorrect) {            
            for (let i = 0; i < applicableAnswer.unlocks.length; i++) {
                // Add unlocks any content that wasn't already unlocked 
                // TODO: Generate ID for submission so we can link unlocks.
                if (!currentTeam.unlocks.find(x => x.unlockedItemId === applicableAnswer.unlocks[i].unlockedItemId)) {
                    currentTeam.unlocks.push({
                        unlockedItemId: applicableAnswer.unlocks[i].unlockedItemId,
                        unlockTime: moment.utc(),
                        unlockReason: 'solve',
                        unlockType: applicableAnswer.unlocks[i].unlockType,
                        unlockSourceId: newSubmission.id
                    })
                }               
            }

            // If the submittable has instances associated with them, but them
            // in the reset state. 
        }
    }

    eventState.progress[teamId].submissions.push(newSubmission);
}

export class InProcGameControl implements GameControl {
    submitAnswer = (submission: string, teamId: string, submittableId: string) => {
        console.log(`API submit: ${submission} team: ${teamId} submittable: ${submittableId}`);
        // Do we validate it isn't already solved at a earlier level?
        // Or ignore it?
        
        store = produce(store, draft => {
            processSubmission(draft, submission, teamId, submittableId);
        });

        console.log("Updated store", store);
        return store.progress[teamId];
    }
}

