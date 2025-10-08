import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostImage from "./PostImage";
import PostActions from "./PostActions";

interface PostCardProps {
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
  commentCount: number;
  likedBy?: string[];
  likedByImages?: string[];
}

const PostCard = ({
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
  commentCount,
  likedBy,
  likedByImages,
}: PostCardProps) => {
  return (
    <div className="w-full bg-card rounded-lg shadow-sm border border-border  max-w-2xl animate-fade-in">
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
        likeCount={likeCount}
        commentCount={commentCount}
        likedBy={likedBy}
        likedByImages={likedByImages}
      />
    </div>
  );
};

export default PostCard;