import baseApi from '../../services/index';

const employeeDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeByID: builder.query<any, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'get'
      }),
      providesTags: ['employee.details']
    }),
    createRedeemRequest: builder.mutation<any, number>({
      query: (bounty) => ({
        url: `/redeem-requests/`,
        method: 'POST',
        body: { bounty }
      })
    })
  })
});

export default employeeDetailsApi;

export const {
  useGetEmployeeByIDQuery,
  useLazyGetEmployeeByIDQuery,
  useCreateRedeemRequestMutation
} = employeeDetailsApi;
