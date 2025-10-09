"use client";
import PostCard from "@/components/post/PostCard";
import { Comment } from "@/lib/features/api/postApiSlice";
import { useState } from "react";

export interface Author {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Post {
  _id: string;
  text: string;
  image?: string;
  author: Author;
  createdAt: string;
  likes: any[];
  dislikes: any[];
}

interface PostsSectionProps {
  posts: Post[] | undefined;
  isLoading: boolean;
  comments: { [postId: string]: Comment[] }
  setComments: React.Dispatch<React.SetStateAction<{ [postId: string]: Comment[] }>>
}

const PostsSection = ({ posts, isLoading, comments, setComments }: PostsSectionProps) => {
  if (isLoading) return <div className="text-center py-6">Loading posts...</div>;
  

  if (!posts || posts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center flex-1 py-12 text-center">
        <img
          src="/broken-controller.png"
          alt="No posts"
          className="w-40  mb-6 opacity-80"
        />
        <h2 className="text-xl font-bold text-foreground mb-2">No posts yet</h2>
        <p className="text-muted-foreground max-w-sm">
          When they share something, it’ll appear here.
        </p>
      </div>
    )

  return (
    <div className="w-full flex flex-col gap-4 mt-8 items-center max-w-4xl mx-auto p-3">
      <div className="flex flex-row justify-between w-full items-center">
        <h2 className="md:text-2xl text-lg font-semibold self-start">Posts</h2>
      </div>

      {posts.length && posts.map((post) => (
        <PostCard
          key={post._id}
          postId={post._id}
          userId={post.author._id}
          userImage={
            post.author.avatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.name}`
          }
          userName={post.author.name}
          userInfo={"placeholder"} // todo add followers here
          timestamp={post.createdAt}
          isPromoted={true}
          content={post.text}
          image={post.image}
          imageAlt={`${post.author.name}'s post`}
          likeCount={post.likes?.length || 0}
          dislikeCount={post.dislikes?.length || 0}
          commentCount={0}
          likedBy={post.likes.map((l) => ({ _id: l._id, name: l.name }))}
          dislikedBy={post.dislikes?.map((l: any) => l.name) || []}
          likedByImages={
            post.likes?.slice(0, 3).map(
              (l: any) =>
                l.avatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${l.name}`
            ) || []
          }
          comments={comments[post._id] || []} 
          setComments={setComments} 

        />
      ))}
    </div>
  );
};

export default PostsSection;
