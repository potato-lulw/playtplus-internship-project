"use client";

import Image from "next/image";
import { ArrowLeft, TriangleAlert } from "lucide-react";
import CreatePostDialog from "./CreatePostDialog";
import ThemeToggle from "../ThemeToggle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Post } from "@/lib/features/api/postApiSlice";
import CustomDialog from "../CustomDialog";
import { useReportUserMutation } from "@/lib/features/api/userApiSlice";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ProfileHeader = ({
  cover,
  isOther = false,
  onPostCreated,
  userId,
}: {
  cover: string;
  isOther?: boolean;
  onPostCreated?: (newPost: Post) => void;
  userId?: string;
}) => {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [reportUser, { isLoading }] = useReportUserMutation();

  const handleReportSubmit = async () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason for reporting.");
      return;
    }

    try {
      const res = await reportUser({ id: userId, reason }).unwrap();
      toast.success(res.message || "User reported successfully.");
      setReason("");
    } catch (err: any) {
      console.error("Error reporting user:", err);
      toast.error(err?.data?.message || "Failed to report user.");
    }
  };

  return (
    <div className="w-full h-[25vh] relative overflow-hidden md:rounded-md">
      <div
        className="absolute top-4 left-4 text-white z-10 cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft color="#fff" size={22} />
      </div>

      <Image
        src={
          cover ||
          "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=1332&auto=format&fit=crop"
        }
        alt="cover-image"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute top-4 right-4 flex gap-2 items-center">
        <ThemeToggle className="rounded-full bg-transparent text-white hover:bg-transparent hover:text-white border-none" />

        {!isOther && <CreatePostDialog onPostCreated={onPostCreated} />}

        {isOther && (
          <CustomDialog
            triggerIcon={<TriangleAlert size={22} color="#fff" />}
            title="Report User"
            description="Please describe why you are reporting this user."
            onSubmit={handleReportSubmit}
            showCancel={true}
            submitLabel={isLoading ? "Reporting..." : "Report"}
          >
            <Input
              placeholder="Enter reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-2"
            />
          </CustomDialog>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
