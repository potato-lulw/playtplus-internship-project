import { api } from "./apiSlice";


const userApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `/users/${id}`,
            //TODO
        })
    })
})