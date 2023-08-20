import baseApi from '../../services/index';

const createEmployeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (body) => ({
        url: '/employees',
        method: 'POST',
        body
      }),
      invalidatesTags: ['employee.list']
    }),
    getDepartmentOptions: builder.query<any, void>({
      query: () => ({
        url: '/departments',
        method: 'get'
      })
    }),
    getRolesOptions: builder.query<any, void>({
      query: () => ({
        url: '/roles',
        method: 'GET'
      })
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `employees/${id}`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: ['employee.list']
    })
  })
});

export default createEmployeeApi;

export const {
  useCreateEmployeeMutation,
  useGetDepartmentOptionsQuery,
  useGetRolesOptionsQuery,
  useUpdateEmployeeMutation
} = createEmployeeApi;
