"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export default function SessionProviderWrapper({ children }: Props) {
  // The SessionProvider automatically fetches and caches the session
  return <SessionProvider>{children}</SessionProvider>
}
