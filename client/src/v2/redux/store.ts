import { configureStore } from "@reduxjs/toolkit";

import eventReducer from './eventSlice';
import { eventApi } from "./services/eventApi";

export const store = configureStore({
    reducer: {
        event: eventReducer,
        [eventApi.reducerPath]: eventApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(eventApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;