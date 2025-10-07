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
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.API_URL}/api/v1/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials)
        })
        const data = await res.json()
        console.log(data)
        if (res.ok) {
          return data;
        }

        throw new Error(data.message || "Invalid credentials or server error");
      }
    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {

    async signIn({ user, account }) {
      console.log("➡️ signIn callback triggered:", account?.provider, user.email);

      if (account?.provider === "google") {
        try {
          const baseUrl = process.env.API_URL || process.env.NEXTAUTH_URL || "http://localhost:8800";
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


    async jwt({ token, user, account }) {
      if (user) {
        token.user = {
          ...token.user,
          _id: user._id || token.user?._id || "",           // fallback for _id
          name: user.name || "Unknown",                     // fallback if null
          email: user.email || "unknown@example.com",      // fallback if null
          avatar: user.avatar || user.image || "",         // merge avatar / image
          cover: user.cover || "",
          followers: user.followers || [],
          following: user.following || [],
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any
      return session
    }



  },
  pages: {
    signIn: "/login"
  }
})

export { handler as GET, handler as POST }
