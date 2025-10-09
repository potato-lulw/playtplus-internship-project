"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TriangleAlert, Volume2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import CustomDialog from "../CustomDialog";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useReportPostMutation } from "@/lib/features/api/postApiSlice";


interface PostHeaderProps {
  userId: string;
  userImage: string;
  userName: string;
  userInfo: string;
  timestamp: string;
  postId: string;
  isPromoted?: boolean;
}

interface ReportFormValues {
  reason: string;
}

const PostHeader = ({
  userId,
  userImage,
  userName,
  userInfo,
  timestamp,
  postId,
  isPromoted = false,
}: PostHeaderProps) => {

  const [reportPost, { isLoading }] = useReportPostMutation();
  const { register, handleSubmit, reset } = useForm<ReportFormValues>();

  const onSubmit = async (data: ReportFormValues) => {
    try {
      const res = await reportPost({ id: postId, reason: data.reason }).unwrap();
      toast.success(res?.message || "Post reported successfully");
      reset();
    } catch (err: any) {
      console.error("Error reporting post:", err);
      toast.error(err?.data?.message || "Failed to report post");
    }
  };

  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${userId}`}>
          <Avatar className="w-12 h-12">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col">
          <h3 className="font-semibold text-foreground">{userName}</h3>
          <p className="text-sm text-muted-foreground">
            {userInfo} •{" "}
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isPromoted && (
          <Badge className="flex items-center gap-2 text-white hover:bg-purple-900 bg-gradient-to-r from-purple-950 to-purple-900">
            <Volume2 size={16} />
            Promoted
          </Badge>
        )}

        {/* REPORT DIALOG */}
        <CustomDialog
          triggerIcon={<TriangleAlert className="h-5 w-5 text-destructive" />}
          title="Report Post"
          description="Please describe the reason for reporting this post."
          submitLabel="Report"
          isLoading={isLoading}
          onSubmit={handleSubmit(onSubmit)}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-foreground">
                Reason
              </label>
              <Textarea
                {...register("reason", { required: "Reason is required" })}
                placeholder="Write your reason here..."
                className="min-h-[100px]"
              />
            </div>
          </form>
        </CustomDialog>
      </div>
    </div>
  );
};

export default PostHeader;
