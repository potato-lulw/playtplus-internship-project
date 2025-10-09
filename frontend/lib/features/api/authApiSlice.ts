import { api } from "./apiSlice";

const authApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: ({name, email, password}) => ({
                url: '/auth/signup',
                method: 'POST',
                body: {name, email, password},
            })
        })
    }),
    // overrideExisting: true
})

export const { useSignUpMutation } = authApiSlice