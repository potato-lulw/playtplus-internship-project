"use client"

import ThemeToggle from "@/components/ThemeToggle";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";


export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  if (!session) {
    return (<>
      <section className="relative w-full flex-1 bg-background flex flex-col items-center justify-center">
        <BackgroundRippleEffect />
        {/* Background gradient subtle overlay */}
        <div className="absolute inset-0  bg-gradient-to-r from-primary/5 to-secondary/5"></div>

        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center gap-6 z-20">

          <div className="flex gap-2 justify-center items-center px-2 py-1 bg-muted/40 text-sm text-gray-500 border border-border rounded-full">
            <Zap className="text-foreground" size={16} color="#6a7282" /> Future of Gaming is here!
          </div>
          {/* Logo */}
          <div className="flex items-center justify-center gap-3">
            <Image src="/logo.png" alt="PlaytPlus Logo" width={60} height={60} />
            <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              PlaytPlus
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
            The social media platform for esports organizers. Easily create scrims, host official matches, and grow your competitive community.
          </p>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90" onClick={() => router.push('/register')}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
              Learn More
            </Button>
          </div>

          
        </div>

        {/* Optional: subtle bottom gradient */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background/90 to-transparent -z-10"></div>
      </section>
    </>

    )
  }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Button>Hello</Button>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
