import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;


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
          const res = await fetch(`${baseUrl}/api/v1/auth/oauth-sync`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              avatar: user.image,
              password: process.env.GOOGLE_PASSWORD,
            }),
          });

          const data = await res.json();

          if (res.ok && data?.user) {
            user._id = data.user.id;
            user.avatar = data.user.avatar;
            user.cover = data.user.cover || "";
          } else {
            console.error("OAuth sync failed:", data?.message);
          }
        } catch (err) {
          console.error("❌ OAuth sync failed:", err);
        }
      }

      return true;
    },



    async jwt({ token, user, trigger, session }) {
      // When user first logs in or signs up
      if (user) {
        token.user = {
          _id: user._id || "",
          name: user.name || "Unknown",
          email: user.email || "unknown@example.com",
          avatar: user.avatar || user.image || "",
          cover: user.cover || "",
          followers: user.followers || [],
          following: user.following || [],
        };
      }

      // When client calls update()
      if (trigger === "update" && session?.user) {
        token.user = {
          ...token.user,
          name: session.user.name,
          avatar: session.user.avatar,
          cover: session.user.cover,
        };
      }

      return token;
    },

    async session({ session, token }) {
      // Make sure token.user exists
      if (token.user) {
        session.user = token.user as {
          _id: string;
          name: string;
          email: string;
          avatar: string;
          cover: string;
          followers: any[];
          following: any[];
        };
      }

      return session;
    },



  },
  pages: {
    signIn: "/login"
  }
})

export { handler as GET, handler as POST }
