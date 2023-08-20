import baseApi from '../../services/index';

const employeeDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeByID: builder.query<any, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'get'
      })
    })
  })
});

export default employeeDetailsApi;

export const { useGetEmployeeByIDQuery, useLazyGetEmployeeByIDQuery } = employeeDetailsApi;
