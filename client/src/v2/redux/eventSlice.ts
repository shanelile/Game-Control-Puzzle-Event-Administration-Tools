import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from 'v2/types';

const initialState: Event = {
    id: 'default',
    name: 'Default Event',
    type: 'beta',
    submittables: [],
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<Event>) => {
            // TODO: Verify event?
            return action.payload;
        }
    }
});

export const { update } = eventSlice.actions;

export default eventSlice.reducer;