import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'orsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://study-platform-backend-drxm.onrender.com',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      const token = state.user?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
