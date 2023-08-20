import baseApi from '../../services/index';

type LoginPayloadType = {
  username: string;
  password: string;
};

const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: LoginPayloadType) => ({
        url: '/employees/login',
        method: 'POST',
        body
      }),
      invalidatesTags: ['employee.list']
    })
  })
});

export default loginApi;

export const { useLoginMutation } = loginApi;
