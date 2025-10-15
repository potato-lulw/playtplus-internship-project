import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/v1'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    credentials: 'include',
  }),
  endpoints: (builder) => ({}),
})


// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { getSession } from "next-auth/react"

// const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/api/v1"

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl,
//     // we don't need credentials: 'include' now unless you use cookies for *something else*
//     prepareHeaders: async (headers) => {
//       // grab NextAuth session (client-side)
//       const session = await getSession()

//       // if a session exists, attach the token
//       if (session?.user?._id) {
//         // this assumes your JWT is embedded in the session
//         const token = session?.accessToken || session?.user?.token
//         if (token) headers.set("Authorization", `Bearer ${token}`)
//       }

//       // required if backend uses JSON
//       headers.set("Content-Type", "application/json")

//       return headers
//     },
//   }),
//   endpoints: () => ({}),
// })
