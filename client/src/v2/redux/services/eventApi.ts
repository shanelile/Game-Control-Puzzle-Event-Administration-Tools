import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Event } from 'v2/types';

export const eventApi = createApi({
    reducerPath: 'eventApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://localhost:8000',
            credentials: 'same-origin'
        }
    ),
    endpoints: (builder) => ({
        getEvent: builder.query<Event, void>({
            query: () => '/event'
        }) 
    })
});

export const { useGetEventQuery } = eventApi;