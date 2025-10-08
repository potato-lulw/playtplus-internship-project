"use client";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfilePicture from "@/components/profile/ProfilePicture";
import ProfileInfo from "@/components/profile/ProfileInfo";
import Followers from "@/components/profile/Followers";
import PostsSection from "@/components/profile/PostsSection";
import { useGetAllPostsQuery, useGetPostsByUserIdQuery } from "@/lib/features/api/postApiSlice";
import { useSession } from "next-auth/react";
import PostCardSkeleton from "@/components/post/PostCarSkeleton";
import { useGetUserQuery } from "@/lib/features/api/userApiSlice";
import { useEffect } from "react";

const MyProfilePage = () => {

  const { data: session, status } = useSession();
  const { data: postsData, error, isLoading } = useGetPostsByUserIdQuery(
    { id: session?.user?._id || "" },
    { skip: !session?.user?._id } // <-- skip until we have the user ID
  );
  


  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br md:p-4 from-primary/5 to-secondary/5">
      <div className="relative w-full bg-background max-w-5xl flex-1 flex-col md:border border-border rounded-md">
        <ProfileHeader cover={session?.user.cover || ""} />
        {
          status === "authenticated" && (
            <div className="relative md:mt-[-5rem] mt-[-3rem] flex flex-row gap-3 p-6">
              <ProfilePicture name={session?.user.name!} avatar={session?.user.avatar!} />
              <ProfileInfo name={session?.user.name || ""} email={session?.user.email || ""} isOther={false} />
            </div>
          )
        }
        <Followers following={session?.user.following?.length || 0} followers={session?.user.followers?.length || 0} />
        {
          isLoading || status === "loading" ? [...Array(5)].map((_, index) => <PostCardSkeleton key={index} />) : <PostsSection posts={postsData?.posts ?? []} isLoading={isLoading} />
        }


      </div>
    </div>
  );
};

export default MyProfilePage;
