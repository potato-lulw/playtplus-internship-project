"use client"

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";


export default function Home() {
  const {data: session} = useSession()

  if(!session) {
    return (
      <Button onClick={() => signIn("google", { callbackUrl: "/" })}>SignIn using Google</Button>
    )
  }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <Button>Hello</Button>
        <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
