"use client"

import PostCard from "@/components/post/PostCard";
import { Post } from "@/components/profile/PostsSection";
import StoriesBar from "@/components/StoriesBar";
import ThemeToggle from "@/components/ThemeToggle";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { Button } from "@/components/ui/button";
import { useGetAllPostsQuery } from "@/lib/features/api/postApiSlice";
import { useGetAllusersQuery } from "@/lib/features/api/userApiSlice";
import { User } from "@/types/User";
import { Zap } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";




interface Story {
  id: string;
  image: string;
  label: string;
  hasStory: boolean;
  isYourStory?: boolean;
}


const convertUserToStory = (user: User, isYourStory = false): Story => {
  return {
    id: user._id,
    image: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}`,
    label: user.name,
    hasStory: true,
    isYourStory
  };
};
export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  const [stories, setStories] = useState<Story[]>();

  const { data, isLoading, error } = useGetAllPostsQuery();
  const { data: userData, isLoading: isUserDataLoading, error: userDataError } = useGetAllusersQuery();


  useEffect(() => {
    if (userData) {
      const stories = userData.users.map((user: User) => convertUserToStory(user));
      setStories(stories);
    }
  }, [userData])

  
  if (!session) {
    return (
      <section className="relative w-full flex-1 bg-background flex flex-col items-center justify-center">
        <BackgroundRippleEffect />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>

        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center gap-6 z-20">
          <div className="flex gap-2 justify-center items-center px-2 py-1 bg-muted/40 text-sm text-gray-500 border border-border rounded-full">
            <Zap className="text-foreground" size={16} /> Future of Gaming is here!
          </div>

          <div className="flex items-center justify-center gap-3">
            <Image src="/logo.png" alt="PlaytPlus Logo" width={60} height={60} />
            <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              PlaytPlus
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
            The social media platform for esports organizers. Easily create scrims, host official matches, and grow your competitive community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90" onClick={() => router.push("/register")}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
              Learn More
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background/90 to-transparent -z-10"></div>
      </section>
    );
  }

  if (isLoading) return <div className="text-center py-6">Loading posts...</div>;
  if (error) return <div className="text-center py-6">Error fetching posts</div>;
  if (!data?.posts || data.posts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-12 text-center">
        <img src="/broken-controller.png" alt="No posts" className="w-40 mb-6 opacity-80" />
        <h2 className="text-xl font-bold text-foreground mb-2">No posts yet</h2>
        <p className="text-muted-foreground max-w-sm">When they share something, it’ll appear here.</p>
      </div>
    );

  return (
    <div className="font-sans flex flex-col bg-gradient-to-br from-primary/5 to-secondary/5 w-full items-center flex-1 p-4 pb-20 gap-4 sm:p-8">
      {stories && <StoriesBar stories={stories} />}

      {data.posts.map((post: Post) => (
        <PostCard
          key={post._id}
          postId={post._id}
          userId={post.author._id}
          userImage={post.author.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.name}`}
          userName={post.author.name}
          userInfo={"placeholder"}
          timestamp={post.createdAt}
          isPromoted={true}
          content={post.text}
          image={post.image}
          imageAlt={`${post.author.name}'s post`}
          likeCount={post.likes.length}
          dislikeCount={post.dislikes.length}
          commentCount={0}
          likedBy={post.likes.map((l) => ({ _id: l._id, name: l.name }))}
          dislikedBy={post.dislikes.map((l) => l._id)}
          likedByImages={post.likes.slice(0, 3).map((l) => l.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${l.name}`)}
        />
      ))}
    </div>
  );
}
