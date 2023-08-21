import baseApi from '../../services';

const taskDetailApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTaskByID: builder.query<any, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'get'
      })
    })
  })
});

export default taskDetailApi;

export const { useGetTaskByIDQuery } = taskDetailApi;
