"use client";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfilePicture from "@/components/profile/ProfilePicture";
import ProfileInfo from "@/components/profile/ProfileInfo";
import Followers from "@/components/profile/Followers";
import PostsSection from "@/components/profile/PostsSection";
import { Comment, useGetAllPostsQuery, useGetPostsByUserIdQuery } from "@/lib/features/api/postApiSlice";
import { useSession } from "next-auth/react";
import PostCardSkeleton from "@/components/post/PostCarSkeleton";
import { useGetFollowingUsersQuery, useGetUserQuery } from "@/lib/features/api/userApiSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const ProfilePage = () => {
  const { id = "" } = useParams();

  const { data: session, status } = useSession();
  const [comments, setComments] = useState<{ [postId: string]: Comment[] }>({});
  const userId = Array.isArray(id) ? id[0] : id;
  const { data: userData, isLoading: userDataIsLoading, error: userDataError } = useGetUserQuery(userId);
  const { data: followingUsers } = useGetFollowingUsersQuery();

  const { data: postsData, error, isLoading } = useGetPostsByUserIdQuery({ id: userData?.user._id || "" }, { skip: !userData?.user._id });

  useEffect(() => {
    if (!postsData?.posts) return;

    // Build comments object keyed by postId
    const commentsMap: { [postId: string]: Comment[] } = {};

    postsData.posts.forEach(post => {
      commentsMap[post._id] = post.comments?.map((c: any) => ({
        _id: c._id,
        text: c.text,
        author: c.author,
        name: c.name,
        postId: c.postId,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt
      })) || [];
    });

    setComments(commentsMap);

    // Update posts without comments (optional)
    

  }, [postsData]);



  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br md:p-4 from-primary/5 to-secondary/5">
      <div className="relative w-full bg-background max-w-5xl flex-1 flex flex-col md:border border-border rounded-md">
        <ProfileHeader userId={userId} cover={userData?.user.cover || ""} isOther={true} />
        <div className="relative md:mt-[-5rem] mt-[-3rem] flex flex-row gap-3 p-6">
          {
            !userDataIsLoading && <ProfilePicture name={userData?.user.name!} avatar={userData?.user.avatar!} />
          }

          {
            !userDataIsLoading && status === "authenticated" && <ProfileInfo id={userData?.user._id || ""} name={userData?.user.name || ""} email={userData?.user.email || ""} isOther={true} isFollowing={followingUsers?.following?.includes(userData?.user._id!)} />
          }
        </div>
        <Followers followers={userData?.user.followers?.length || 0} following={userData?.user.following?.length || 0} />
        {
          isLoading || userDataIsLoading ? [...Array(5)].map((_, index) => <PostCardSkeleton key={index} />) : <PostsSection posts={postsData?.posts ?? []} isLoading={isLoading} comments={comments} setComments={setComments} />
        }


      </div>
    </div>
  );
};

export default ProfilePage;
