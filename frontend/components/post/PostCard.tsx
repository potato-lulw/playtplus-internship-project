import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import { Comment  } from "@/lib/features/api/postApiSlice";

interface PostCardProps {
  postId: string;
  userId: string;
  userImage: string;
  userName: string;
  userInfo: string;
  timestamp: string;
  isPromoted?: boolean;
  content: string;
  image?: string;
  imageAlt?: string;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  likedBy?: { name: string, _id: string }[];
  dislikedBy?: string[];
  likedByImages?: string[];
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<{ [postId: string]: Comment[] }>>;
}

const PostCard = ({
  postId,
  userId,
  userImage,
  userName,
  userInfo,
  timestamp,
  isPromoted = false,
  content,
  image,
  imageAlt = "Post image",
  likeCount,
  dislikeCount,
  commentCount,
  likedBy,
  dislikedBy,
  likedByImages,
  comments,
  setComments

}: PostCardProps) => {
  return (
    <div className="w-full bg-card rounded-lg shadow-sm border border-border  max-w-4xl animate-fade-in">
      <PostHeader
        postId={postId}
        userId={userId}
        userImage={userImage}
        userName={userName}
        userInfo={userInfo}
        timestamp={timestamp}
        isPromoted={isPromoted}
      />

      <PostContent text={content} />

      {image && <PostImage src={image} alt={imageAlt} />}

      <PostActions
        postId={postId}
        userId={userId}
        likeCount={likeCount}
        dislikeCount={dislikeCount}
        commentCount={commentCount}
        likedBy={likedBy}
        dislikedBy={dislikedBy}
        likedByImages={likedByImages}
        comments={comments}// <-- Pass the array of strings directly
        setComments={setComments}
      />
    </div>
  );
};

export default PostCard;