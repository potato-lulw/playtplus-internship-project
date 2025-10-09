import { Button } from "@/components/ui/button";
import { Heart, HeartCrack, MessageCircle, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLikePostMutation, useDislikePostMutation, useCreateCommentMutation, Comment } from "@/lib/features/api/postApiSlice";
import { useSession } from "next-auth/react";
import { formatDistanceToNow } from 'date-fns';

interface PostActionsProps {
    postId: string;
    userId: string,
    likeCount: number;
    commentCount: number;
    dislikeCount: number;
    likedBy?: { name: string, _id: string }[];
    dislikedBy?: string[];
    likedByImages?: string[];
    comments: Comment[];
    setComments?: React.Dispatch<React.SetStateAction<{ [postId: string]: Comment[] }>>;
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
    comments,
    setComments,
}: PostActionsProps) => {

    const [showCommentInput, setShowCommentInput] = useState(false);
    const [newComment, setNewComment] = useState("");
    const { data } = useSession();
    const [isLiked, setIsLiked] = useState(
        likedBy.some((l) => l._id === data?.user._id)
    );

    const [isDisliked, setIsDisliked] = useState(dislikedBy.includes(data?.user._id!));
    const [currentLikes, setCurrentLikes] = useState(likeCount);
    const [currentDislikes, setCurrentDislikes] = useState(dislikeCount);
    const [createComment] = useCreateCommentMutation();

    const [likePost] = useLikePostMutation();
    const [dislikePost] = useDislikePostMutation();

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        if (!data?.user) return; // Prevent commenting if not logged in

        try {
            const res = await createComment({ postId, text: newComment.trim() }).unwrap();


            setComments?.((prev) => ({
                ...prev,
                [postId]: [...(prev[postId] || []), res.comment],
            }));

            setNewComment("");
            setShowCommentInput(false);
        } catch (err) {
            console.error("Error creating comment:", err);
        }
    };

    const handleLike = async () => {
        if (!data?.user) return;

        try {
            const res = await likePost({ postId, userId: data?.user._id }).unwrap();
            setCurrentLikes(res.post.likes.length);
            setCurrentDislikes(res.post.dislikes.length);

            // Update liked/disliked state based on server arrays
            setIsLiked(res.post.likes.some(l => l === data?.user._id));
            setIsDisliked(res.post.dislikes.some(d => d === data?.user._id));
        } catch (err) {
            console.error("Error liking post:", err);
        }
    };

    const handleDislike = async () => {
        if (!data?.user) return;

        try {
            const res = await dislikePost({ postId, userId: data?.user._id }).unwrap();
            setCurrentLikes(res.post.likes.length);
            setCurrentDislikes(res.post.dislikes.length);

            setIsLiked(res.post.likes.some(l => l === data?.user._id));
            setIsDisliked(res.post.dislikes.some(d => d === data?.user._id));
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
                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 hover:bg-accent/10"
                    onClick={() => setShowCommentInput(!showCommentInput)}
                >
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">{comments.length}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent/10">
                    <Share2 className="h-5 w-5" />
                    <span className="font-medium">Share</span>
                </Button>
            </div>

            {showCommentInput && (
                <div className="mt-2 flex gap-2 items-center">
                    <input
                        type="text"
                        className="flex-1 input input-bordered"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                    />
                    <Button size="sm" onClick={handleAddComment}>
                        Post
                    </Button>
                </div>
            )}


            {comments?.length > 0 && (
                <div className="mt-2 space-y-2 border-t border-border pt-2"> 
                    {comments.map((comment, i) => ( 
                        <div key={comment._id || i} className="flex flex-col text-sm">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-foreground">
                                    {comment.author.name || comment.name || "Anonymous"}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    • {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : 'just now'}
                                </span>
                            </div>
                            <p className="text-muted-foreground whitespace-pre-wrap">
                                {comment.text}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {likedBy.length > 0 && (
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                        {likedByImages.slice(0, 3).map((img, idx) => (
                            <Avatar key={idx} className="w-6 h-6 border-2 border-card">
                                <AvatarImage src={img} />
                                <AvatarFallback>{likedBy[idx]?.name?.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Liked by <span className="font-semibold text-foreground">{likedBy[0]?.name}</span>
                        {likedBy.length > 1 && <span> and {likedBy.length - 1} others</span>}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PostActions;