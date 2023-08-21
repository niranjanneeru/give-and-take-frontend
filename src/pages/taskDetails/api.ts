import baseApi from '../../services';

const taskDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTaskByID: builder.query<any, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'get'
      })
    })
  })
});

export default taskDetailsApi;

export const { useGetTaskByIDQuery, useLazyGetTaskByIDQuery } = taskDetailsApi;
