import baseApi from '../../services/index';

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<any, void>({
      query: () => ({
        url: '/tasks',
        method: 'get'
      }),
      providesTags: ['task.list']
    }),
    getFilteredTasks: builder.query<any, { status: string }>({
      query: (params) => ({
        url: '/tasks',
        method: 'get',
        params: { status: params.status }
      })
    })
  })
});

export const { useGetTasksQuery, useLazyGetTasksQuery, useLazyGetFilteredTasksQuery } = taskApi;

export default taskApi;
