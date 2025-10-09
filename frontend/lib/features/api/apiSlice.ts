import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl =  process.env.NEXT_PUBLIC_API_URL  ||  'http://localhost:8800' + '/api/v1'
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => (
    {}),
})


