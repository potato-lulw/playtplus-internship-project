"use client"

import PostCard from "@/components/post/PostCard";
import StoriesBar from "@/components/StoriesBar";
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

  const stories = [
    {
      id: "1",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=yours",
      label: "Your Story",
      hasStory: true,
      isYourStory: true,
    },
    {
      id: "2",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=lethal",
      label: "Lethal Esporortsasda",
      hasStory: true,
    },
    {
      id: "3",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=olive1",
      label: "Olivelgnite",
      hasStory: true,
    },
    {
      id: "4",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=olive2",
      label: "Olivelgnite",
      hasStory: true,
    },
    {
      id: "5",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=lethal2",
      label: "Lethal Esports",
      hasStory: true,
    },
    {
      id: "6",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=lethal3",
      label: "Lethal Espor...",
      hasStory: true,
    },
    {
      id: "7",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=olive3",
      label: "Olivelgnite",
      hasStory: true,
    },
    {
      id: "8",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=govi",
      label: "Govicode",
      hasStory: true,
    },
    {
      id: "9",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=govi",
      label: "Govicode",
      hasStory: true,
    },
    {
      id: "10",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=govi",
      label: "Govicode",
      hasStory: true,
    },
    {
      id: "11",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=govi",
      label: "Govicode",
      hasStory: true,
    },
  ];
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
    <div className="font-sans flex flex-col bg-gradient-to-br from-primary/5 to-secondary/5 w-full items-center flex-1 p-4 pb-20 gap-4 sm:p-8">
      <StoriesBar stories={stories} />
      <PostCard
        userId="1"
        userImage="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
        userName="Sarah Benette"
        userInfo="2.2k Members"
        timestamp="4d ago"
        isPromoted={true}
        content="Hey Guys!
Been a while. Let's play a tournament!"
        image="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop"
        imageAlt="Gaming tournament landscape"
        likeCount={214}
        commentCount={38}
        likedBy={["Jamie", "Alex", "Sam"]}
        likedByImages={[
          "https://api.dicebear.com/7.x/avataaars/svg?seed=jamie",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
          "https://api.dicebear.com/7.x/avataaars/svg?seed=sam",
        ]}
      />

    </div >
  );
}
