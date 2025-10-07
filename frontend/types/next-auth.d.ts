import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  // Extend the default Session
  interface Session {
    user: {
      _id: string
      email: string
      name: string
      avatar?: string
      cover?: string
      followers?: string[]
      following?: string[]
    } & DefaultSession["user"]
  }

  // Extend the default User
  interface User extends DefaultUser {
    _id: string
    avatar?: string
    cover?: string
    followers?: string[]
    following?: string[]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      _id: string
      email: string
      name: string
      avatar?: string
      cover?: string
      followers?: string[]
      following?: string[]
    }
  }
}
