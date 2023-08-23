import baseApi from '../../services/index';

const redeemRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRedeemRequests: builder.query<any, void>({
      query: () => ({
        url: '/redeem-requests',
        method: 'get'
      }),
      providesTags: ['redeemRequest.list']
    }),
    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `/redeem-requests/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['redeemRequest.list']
    }),
    updateRequest: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/redeem-requests/${id}`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: ['redeemRequest.list']
    })
  })
});

export default redeemRequestApi;

export const { useGetRedeemRequestsQuery, useDeleteRequestMutation, useUpdateRequestMutation } =
  redeemRequestApi;
