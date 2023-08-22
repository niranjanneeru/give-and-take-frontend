import baseApi from '../../services/index';

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<any, void>({
      query: () => ({
        url: '/tasks',
        method: 'get'
      }),
      providesTags: ['task.list']
    })
  })
});

export const { useGetTasksQuery, useLazyGetTasksQuery } = taskApi;

export default taskApi;
