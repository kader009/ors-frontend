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
      providesTags: ['User'],
    }),

    // create user only admin
    createUser: build.mutation({
      query: (userInfo) => ({
        url: '/user',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags: ['User'],
    }),

    // user delete for admin
    userDelete: build.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    // update user
    userUpdate: build.mutation({
      query: ({ userId, role }) => ({
        url: `/user/${userId}/role`,
        method: 'PATCH',
        body: { role },
      }),
      invalidatesTags: ['User'],
    }),

    // all ors plan (admin)
    allOrsPlan: build.query({
      query: () => ({
        url: '/ors',
        method: 'GET',
      }),
      providesTags: ['ORS'],
    }),

    // ors plan delete (admin)
    orsDelete: build.mutation({
      query: (orsId) => ({
        url: `/ors/${orsId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ORS'],
    }),

    // ors plan update (admin & inspector)

    orsUpdate: build.mutation({
      query: ({ orsId, orsData }) => ({
        url: `/ors/${orsId}`,
        method: 'PUT',
        body: orsData,
      }),
      invalidatesTags: ['ORS'],
    }),

    createOrsPlan: build.mutation({
      query: (orsData) => ({
        url: '/ors',
        method: 'POST',
        body: orsData,
      }),
      invalidatesTags: ['ORS'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useAllUserQuery,
  useAllOrsPlanQuery,
  useUserDeleteMutation,
  useUserUpdateMutation,
  useOrsDeleteMutation,
  useOrsUpdateMutation,
  useCreateOrsPlanMutation,
  useCreateUserMutation,
} = ORSApi;
