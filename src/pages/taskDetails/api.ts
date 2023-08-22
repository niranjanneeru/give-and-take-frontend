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
      query:(body) => ({
        url: 'uploads',
        method: 'post',
        body
      })
    })
  })
});

export default taskDetailsApi;

export const { useGetTaskByIDQuery, useAddCommentsMutation, useUploadFileMutation } = taskDetailApi;


