import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Volume2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface PostHeaderProps {
  userId: string;
  userImage: string;
  userName: string;
  userInfo: string;
  timestamp: string;
  isPromoted?: boolean;
}

const PostHeader = ({
  userId,
  userImage,
  userName,
  userInfo,
  timestamp,
  isPromoted = false,
}: PostHeaderProps) => {
  // console.log(userImage)
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
            {userInfo} • {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isPromoted && (
          <Badge className=" flex items-center gap-2 text-white hover:bg-promoted/90 bg-gradient-to-r from-purple-950 to-purple-900">
            <Volume2 size={16}/>
            Promoted
          </Badge>
        )}
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PostHeader;