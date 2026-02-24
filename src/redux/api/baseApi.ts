import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQueryWithRetry = retry(
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as unknown as { user: { token: string | null } };
      const token = state.user?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  { maxRetries: 3 },
);

export const baseApi = createApi({
  reducerPath: 'orsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['User', 'ORS'],
  endpoints: () => ({}),
});
