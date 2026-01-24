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
  }),
});

export const { useRegisterMutation, useLoginMutation } = ORSApi;
