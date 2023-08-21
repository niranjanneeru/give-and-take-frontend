import baseApi from '../../services';

const taskDetailApi = baseApi.injectEndpoints({
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
      query:(body) => ({
        url: 'uploads',
        method: 'post',
        body
      })
    })
  })
});

export default taskDetailApi;

export const { useGetTaskByIDQuery, useAddCommentsMutation, useUploadFileMutation } = taskDetailApi;
