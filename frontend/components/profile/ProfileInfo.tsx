"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import FollowButton from "./FollowButton";
import { useFollowUserMutation, useUpdateUserMutation } from "@/lib/features/api/userApiSlice";
import { toast } from "sonner";
import CustomDialog from "../CustomDialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type ProfileFormValues = {
    name: string;
    avatar: FileList;
    cover: FileList;
};

const ProfileInfo = ({
    id,
    name,
    email,
    isOther,
    isFollowing,
}: {
    id?: string;
    name: string;
    email: string;
    isOther: boolean;
    isFollowing?: boolean;
}) => {
    const { data: session, update } = useSession();
    const [following, setFollowing] = useState(isFollowing || false);
    const [followUser] = useFollowUserMutation();
    const [updateUser] = useUpdateUserMutation();



    const handleFollow = async () => {
        try {
            if (!id) return;
            const res = await followUser(id).unwrap();
            setFollowing(res.following);
            toast.success(res.message);
        } catch (error) {
            console.error("Error following/unfollowing:", error);
            toast.error("Error following/unfollowing!");
        }
    };

    // === React Hook Form Setup ===
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        watch,
        reset,
    } = useForm<ProfileFormValues>({
        defaultValues: {
            name,
        },
    });

    // Watch for previews
    const avatarPreview = watch("avatar")?.[0]
        ? URL.createObjectURL(watch("avatar")[0])
        : null;
    const coverPreview = watch("cover")?.[0]
        ? URL.createObjectURL(watch("cover")[0])
        : null;


    const onSubmit = async (data: ProfileFormValues) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            if (data.avatar?.[0]) formData.append("avatar", data.avatar[0]);
            if (data.cover?.[0]) formData.append("cover", data.cover[0]);

            const res = await updateUser(formData).unwrap();

            toast.success(res.message || "Profile updated!");
            await update({
                user: {
                    ...session?.user,
                    name: res.user.name,
                    avatar: res.user.avatar,
                    cover: res.user.cover,
                },
            });
        } catch (err: any) {
            toast.error(err?.data?.message || "Error updating profile");
        }
    };


    return (
        <div className="text-center flex justify-between md:mt-[4rem] mt-[2rem] flex-1">
            <div>
                <div className="font-bold md:text-2xl text-lg flex items-center gap-2">
                    <p className="bg-gradient-to-l from-primary to-secondary text-transparent bg-clip-text">
                        {name}
                    </p>
                    <ChevronDown size={16} />
                </div>
                <p className="text-muted-foreground md:text-sm text-xs text-left">
                    {email}
                </p>
            </div>

            {isOther ? (
                <FollowButton following={following} handleFollow={handleFollow} />
            ) : (
                <CustomDialog
                    triggerIcon={
                        <Button className="mt-[0.5rem] hover:cursor-pointer rounded-full bg-gradient-to-r from-primary to-secondary text-white">
                            Edit Profile
                        </Button>
                    }
                    title="Edit Profile"
                    description="Change your profile information"
                    showCancel
                    submitLabel="Save"
                    onSubmit={handleSubmit(onSubmit)}
                    isLoading={isSubmitting}
                >
                    {/* === Form Fields === */}
                    <div className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium">Name</label>
                            <Input
                                {...register("name", { required: true })}
                                placeholder="Your name"
                                className="mt-1"
                            />
                        </div>

                        {/* Avatar Upload */}
                        <div>
                            <label className="text-sm font-medium">Avatar</label>
                            <Input type="file" accept="image/*" {...register("avatar")} />
                            {avatarPreview && (
                                <div className="mt-2 w-20 h-20 rounded-full overflow-hidden">
                                    <Image
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        width={80}
                                        height={80}
                                        className="object-cover rounded-full"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Cover Picture Upload */}
                        <div>
                            <label className="text-sm font-medium">Cover Picture</label>
                            <Input type="file" accept="image/*" {...register("cover")} />
                            {coverPreview && (
                                <div className="mt-2 w-full h-32 rounded-lg overflow-hidden">
                                    <Image
                                        src={coverPreview}
                                        alt="Cover Preview"
                                        width={300}
                                        height={128}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </CustomDialog>
            )}
        </div>
    );
};

export default ProfileInfo;
