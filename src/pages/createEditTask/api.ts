import baseApi from '../../services/index';

const createTaskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: (body) => ({
        url: 'tasks',
        method: 'POST',
        body
      }),
      invalidatesTags: ['task.list', 'employee.list']
    }),
    updateTask: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: ['task.list', 'task.detail']
    })
  })
});

export default createTaskApi;

export const { useCreateTaskMutation, useUpdateTaskMutation } = createTaskApi;
