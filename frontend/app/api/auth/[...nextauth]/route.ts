import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const baseUrl = process.env.API_URL || process.env.NEXTAUTH_URL || "http://localhost:8800";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials)
        })

        const user = await res.json()
        if (res.ok && user) return user
        throw new Error(user.message || "Invalid credentials")
      }
    })
  ],

  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // When Google user logs in
    async signIn({ user, account }) {
      console.log("➡️ signIn callback triggered:", account?.provider, user.email);

      if (account?.provider === "google") {
        try {
          const baseUrl = process.env.API_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
          const res = await fetch(`${baseUrl}/api/v1/auth/oauth-sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              avatar: user.image,
              password: process.env.GOOGLE_PASSWORD
            }),
          });

          console.log("Sync response:", res.status);
        } catch (err) {
          console.error("❌ OAuth sync failed:", err);
        }
      }

      return true;
    },


    async jwt({ token, user }) {
      if (user) token.user = user as any
      return token
    },
    async session({ session, token }) {
      session.user = token.user as any
      return session
    }
  }
})

export { handler as GET, handler as POST }
