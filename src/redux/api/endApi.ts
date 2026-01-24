import { baseApi } from './baseApi';

const ORSApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // register here
    register: build.mutation({
      query: (userInfo) => ({
        url: '/auth/register',
        method: 'POST',
        body: userInfo,
      }),
    }),

    // login here
    login: build.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),

    // all user admin only
    allUser: build.query({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
    }),

    // all ors plan (admin)
    allOrsPlan: build.query({
      query: () => ({
        url: '/ors',
        method: 'GET',
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useAllUserQuery, useAllOrsPlanQuery } =
  ORSApi;
