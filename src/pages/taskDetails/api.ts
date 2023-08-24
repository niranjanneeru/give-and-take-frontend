import baseApi from '../../services';

const taskDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTaskByID: builder.query<any, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'GET'
      }),
      providesTags: ['task.detail']
    }),
    addComments: builder.mutation({
      query: ({ id, body }) => ({
        url: `/tasks/${id}/comments`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['task.detail']
    }),
    uploadFile: builder.mutation({
      query: (body) => ({
        url: 'uploads',
        method: 'POST',
        body
      })
    }),
    addAssignee: builder.mutation({
      query: ({ taskId, assigneeId }) => ({
        url: `/tasks/${taskId}/assignees/${assigneeId}`,
        method: 'PATCH'
      }),
      invalidatesTags: ['task.detail']
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['task.list']
    }),
    deleteAssignee: builder.mutation({
      query: ({ taskId, assigneeId }) => ({
        url: `/tasks/${taskId}/assignees/${assigneeId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['task.detail']
    })
  })
});

export default taskDetailsApi;

export const {
  useGetTaskByIDQuery,
  useAddCommentsMutation,
  useUploadFileMutation,
  useLazyGetTaskByIDQuery,
  useAddAssigneeMutation,
  useDeleteTaskMutation,
  useDeleteAssigneeMutation
} = taskDetailsApi;
