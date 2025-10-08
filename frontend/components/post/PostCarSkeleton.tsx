import { Skeleton } from "@/components/ui/skeleton"; 
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const PostCardSkeleton = () => {
  return (
    <div className="w-full mx-auto my-10 bg-card rounded-lg shadow-sm border border-border max-w-4xl animate-pulse space-y-4 p-4">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1 gap-2">
          <div className="h-4 bg-muted rounded w-1/3"></div>
          <div className="h-3 bg-muted rounded w-1/4"></div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
      </div>

      {/* Image */}
      <div className="h-60 bg-muted rounded w-full"></div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-2">
        <div className="h-6 w-16 bg-muted rounded"></div>
        <div className="h-6 w-16 bg-muted rounded"></div>
        <div className="h-6 w-16 bg-muted rounded"></div>
        <div className="h-6 w-16 bg-muted rounded"></div>
      </div>

      {/* Liked by avatars */}
      <div className="flex items-center gap-2 mt-2">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 bg-muted rounded-full border-2 border-card"></div>
          <div className="w-6 h-6 bg-muted rounded-full border-2 border-card"></div>
          <div className="w-6 h-6 bg-muted rounded-full border-2 border-card"></div>
        </div>
        <div className="h-3 w-32 bg-muted rounded"></div>
      </div>

    </div>
  );
};

export default PostCardSkeleton;
