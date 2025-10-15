import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

// Use NEXT_PUBLIC_API_URL for the backend URL base, as specified by the user.
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// NEXTAUTH_URL is automatically picked up by NextAuth but defining it is good practice.
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;


const handler = NextAuth({
  // Configuration options are placed here
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
        // ✅ FIX: Using the consistently defined `baseUrl` for the backend API call.
        const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials)
        })
        const data = await res.json()

        console.log("Credentials Login Response Data:", data);

        if (res.ok) {
          // If login is successful, return the user object (which should contain custom data like tokens/IDs)
          return data;
        }

        // If login fails, throw an error with the message to be displayed by NextAuth's error handler
        throw new Error(data.message || "Invalid credentials or server error");
      }
    })
  ],

  // Session configuration
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // JWT configuration
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  // Secret is required for signing and encrypting tokens
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true, // ⭐ Required when sameSite: 'none'
      },
    }
  },

  callbacks: {

    // Called on successful sign in
    async signIn({ user, account }) {
      console.log("➡️ signIn callback triggered:", account?.provider, user.email);

      if (account?.provider === "google") {
        try {
          // Use the consistently defined `baseUrl` for the OAuth sync endpoint
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
          console.log("OAuth Sync Response:", data);

          // Attach custom properties (like the backend user ID and cover image) to the NextAuth user object
          if (res.ok && data?.user) {
            user._id = data.user.id;
            user.avatar = data.user.avatar;
            user.cover = data.user.cover || "";
            user.followers = data.user.followers || [];
            user.following = data.user.following || [];
          } else {
            console.error("OAuth sync failed:", data?.message);
          }
        } catch (err) {
          console.error("❌ OAuth sync failed due to network/server error:", err);
        }
      }

      // Allow sign in to proceed
      return true;
    },


    // Called when a JWT is created (on sign in) or updated
    async jwt({ token, user, trigger, session }) {
      // 1. Initial sign-in (user object exists)
      if (user) {
        // Transfer custom user data from the sign-in process to the token
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

      // 2. Client calls update() (trigger is "update")
      if (trigger === "update" && session?.user) {
        // Update specific fields in the token from the provided session payload
        token.user = {
          ...token.user,
          name: session.user.name,
          avatar: session.user.avatar,
          cover: session.user.cover,
        };
      }

      return token;
    },

    // Called whenever the session is accessed by the client
    async session({ session, token }) {
      // Expose the custom user object from the token to the client session
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

  // Custom sign-in page path
  pages: {
    signIn: "/login"
  },


})

// Export the handler for Next.js API routes
export { handler as GET, handler as POST }