import { baseApi } from './baseApi';

const ORSApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    // register here
    register: build.mutation({
      query: (userInfo) => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body: userInfo,
      }),
    }),

    // login here
    login: build.mutation({
      query: (userInfo) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = ORSApi;
