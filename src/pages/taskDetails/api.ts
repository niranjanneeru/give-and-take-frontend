import baseApi from '../../services';

const taskDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTaskByID: builder.query<any, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'get'
      }),
      providesTags: ['task.detail']
    }),
    addComments: builder.mutation({
      query: ({ id, body }) => ({
        url: `/tasks/${id}/comments`,
        method: 'post',
        body
      }),
      invalidatesTags: ['task.detail']
    }),
    uploadFile: builder.mutation({
      query: (body) => ({
        url: 'uploads',
        method: 'post',
        body
      })
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['task.list']
    })
  })
});

export default taskDetailsApi;

export const {
  useGetTaskByIDQuery,
  useAddCommentsMutation,
  useUploadFileMutation,
  useLazyGetTaskByIDQuery,
  useDeleteTaskMutation
} = taskDetailsApi;
