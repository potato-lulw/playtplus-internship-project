import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostImage from "./PostImage";
import PostActions from "./PostActions";

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
  likedBy?: string[];
  dislikedBy?: string[];
  likedByImages?: string[];
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
}: PostCardProps) => {
  return (
    <div className="w-full bg-card rounded-lg shadow-sm border border-border  max-w-4xl animate-fade-in">
      <PostHeader
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
      />
    </div>
  );
};

export default PostCard;