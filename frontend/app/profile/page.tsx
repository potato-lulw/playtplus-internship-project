"use client";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfilePicture from "@/components/profile/ProfilePicture";
import ProfileInfo from "@/components/profile/ProfileInfo";
import Followers from "@/components/profile/Followers";
import PostsSection from "@/components/profile/PostsSection";
import { PostData, useGetAllPostsQuery, useGetPostsByUserIdQuery } from "@/lib/features/api/postApiSlice";
import { useSession } from "next-auth/react";
import PostCardSkeleton from "@/components/post/PostCarSkeleton";
import { useGetFollowingUsersQuery, useGetUserQuery } from "@/lib/features/api/userApiSlice";
import { useEffect, useState } from "react";
import { set } from "date-fns";

const MyProfilePage = () => {

  const { data: session, status } = useSession();
  const [postData, setPostData] = useState<PostData>({ message: "", posts: [] });

  const userId = Array.isArray(session?.user._id) ? session.user._id[0] : session?.user._id;
  const { data: userData, isLoading: userDataIsLoading, error: userDataError } = useGetUserQuery(userId);
  const { data: postsData, error, isLoading } = useGetPostsByUserIdQuery(
    { id: session?.user?._id || "" },
    { skip: !session?.user?._id } // <-- skip until we have the user ID
  );



  useEffect(() => {

    setPostData({ message: "", posts: postsData?.posts || [] });
    console.log(postData)

  }, [postsData]);



  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br md:p-4 from-primary/5 to-secondary/5">
      <div className="relative w-full bg-background max-w-5xl flex-1 flex-col md:border border-border rounded-md">
        <ProfileHeader
          cover={session?.user.cover || ""}
          onPostCreated={(newPost) => {
            setPostData(prev => ({
              ...prev,
              posts: [newPost, ...prev.posts] // <-- prepend new post
            }));
          }}
        />
        {
          status === "authenticated" && (
            <div className="relative md:mt-[-5rem] mt-[-3rem] flex flex-row gap-3 p-6">
              <ProfilePicture name={session?.user.name!} avatar={session?.user.avatar!} />
              <ProfileInfo name={session?.user.name || ""} email={session?.user.email || ""} isOther={false} />
            </div>
          )
        }
        <Followers followers={userData?.user.followers?.length || 0} following={userData?.user.following?.length || 0} />
        {isLoading || status === "loading"
          ? [...Array(5)].map((_, index) => <PostCardSkeleton key={index} />)
          : <PostsSection posts={postData.posts} isLoading={isLoading} />
        }


      </div>
    </div>
  );
};

export default MyProfilePage;
