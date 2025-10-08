import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PostActionsProps {
    likeCount: number;
    commentCount: number;
    likedBy?: string[];
    likedByImages?: string[];
}

const PostActions = ({
    likeCount,
    commentCount,
    likedBy = [],
    likedByImages = [],
}: PostActionsProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [currentLikes, setCurrentLikes] = useState(likeCount);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
    };

    return (
        <div className="space-y-3 p-6">


            <div className="flex items-center justify-between pt-3 ">
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "gap-2 hover:bg-accent/10",
                        isLiked && "text-destructive hover:text-destructive"
                    )}
                    onClick={handleLike}
                >
                    <Heart
                        className={cn("h-5 w-5", isLiked && "fill-destructive")}
                    />
                    <span className="font-medium">{currentLikes}</span>
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
                        {likedBy.length > 1 && (
                            <span> and {likedBy.length - 1} others</span>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PostActions;