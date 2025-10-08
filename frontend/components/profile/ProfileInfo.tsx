"use client";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import FollowButton from "./FollowButton";
import { useFollowUserMutation } from "@/lib/features/api/userApiSlice";
import { toast } from "sonner";

const ProfileInfo = ({ id, name, email, isOther, isFollowing }: { id?: string, name: string, email: string, isOther: boolean, isFollowing?: boolean }) => {
    const { data, status } = useSession();
    const [following, setFollowing] = useState(isFollowing || false);
    const [followUser] = useFollowUserMutation();
    const handleFollow = async () => {
        try {
            if(!id) return
            const res = await followUser(id).unwrap();
            setFollowing(res.following);
            toast.success(res.message);
        } catch (error) {
            console.error("Error following/unfollowing:", error);
            toast.error("Error following/unfollowing!");
        }
    }
    return (
        <div className="text-center flex  justify-between md:mt-[4rem] mt-[2rem] flex-1">
            <div>
                <div className="font-bold md:text-2xl text-lg flex items-center gap-2">
                    <p className="bg-gradient-to-l from-primary to-secondary text-transparent bg-clip-text">
                        {name}
                    </p>
                    <ChevronDown size={16} />
                </div>
                <p className="text-muted-foreground md:text-sm text-xs text-left">{email}</p>
            </div>
            {
                isOther ? (
                    <FollowButton following={following} handleFollow={handleFollow} />
                ) : (

                    <Button className="mt-[0.5rem] rounded-full bg-gradient-to-r from-primary to-secondary text-white">
                        Edit Profile
                    </Button>
                )
            }
        </div >
    );
};

export default ProfileInfo;
