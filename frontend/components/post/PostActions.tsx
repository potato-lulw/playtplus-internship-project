import { Button } from "@/components/ui/button";
import { Heart, HeartCrack, MessageCircle, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLikePostMutation, useDislikePostMutation } from "@/lib/features/api/postApiSlice";
import { useSession } from "next-auth/react";

interface PostActionsProps {
    postId: string;
    userId: string,
    likeCount: number;
    commentCount: number;
    dislikeCount: number;
    likedBy?: string[];
    dislikedBy?: string[];
    likedByImages?: string[];
}

const PostActions = ({
    postId,
    userId,
    likeCount,
    dislikeCount,
    commentCount,
    likedBy = [],
    dislikedBy = [],
    likedByImages = [],
}: PostActionsProps) => {


    const { data } = useSession();
    const [isLiked, setIsLiked] = useState(likedBy.includes(data?.user.name!));
    const [isDisliked, setIsDisliked] = useState(dislikedBy.includes(data?.user.name!));
    const [currentLikes, setCurrentLikes] = useState(likeCount);
    const [currentDislikes, setCurrentDislikes] = useState(dislikeCount);

    const [likePost] = useLikePostMutation();
    const [dislikePost] = useDislikePostMutation();

    const handleLike = async () => {
        if (!userId) return;

        try {
            const res = await likePost({ postId, userId }).unwrap();
            setCurrentLikes(res.post.likes.length);
            setCurrentDislikes(res.post.dislikes.length);
            setIsLiked(!isLiked);
            setIsDisliked(false);
        } catch (err) {
            console.error("Error liking post:", err);
        }
    };

    const handleDislike = async () => {
        if (!userId) return;

        try {
            const res = await dislikePost({ postId, userId }).unwrap();
            setCurrentLikes(res.post.likes.length);
            setCurrentDislikes(res.post.dislikes.length);
            setIsLiked(false);
            setIsDisliked(!isDisliked);
        } catch (err) {
            console.error("Error disliking post:", err);
        }
    };


    return (
        <div className="space-y-3 p-6">
            <div className="flex items-center justify-between pt-3 ">
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn("gap-2 hover:bg-accent/10", isLiked && "text-destructive")}
                    onClick={handleLike}
                >
                    <Heart className={cn("h-5 w-5", isLiked && "fill-destructive")} />
                    <span className="font-medium">{currentLikes}</span>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn("gap-2 hover:bg-accent/10", isDisliked && "text-destructive")}
                    onClick={handleDislike}
                >
                    <HeartCrack className={cn("h-5 w-5", isDisliked && "fill-destructive")} />
                    <span className="font-medium">{currentDislikes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent/10">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">{commentCount}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent/10">
                    <Share2 className="h-5 w-5" />
                    <span className="font-medium">Share</span>
                </Button>
            </div>

            {likedBy.length > 0 && (
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                        {likedByImages.slice(0, 3).map((img, idx) => (
                            <Avatar key={idx} className="w-6 h-6 border-2 border-card">
                                <AvatarImage src={img} />
                                <AvatarFallback>{likedBy[idx]?.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Liked by <span className="font-semibold text-foreground">{likedBy[0]}</span>
                        {likedBy.length > 1 && <span> and {likedBy.length - 1} others</span>}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PostActions;