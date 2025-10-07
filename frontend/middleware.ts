// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { nextUrl, nextauth } = req;
    const isLoggedIn = !!nextauth?.token;

    const authPages = ["/login", "/register"];

    if (isLoggedIn && authPages.includes(nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: () => true, // let all routes through, we’ll handle redirect manually
    },
  }
);
