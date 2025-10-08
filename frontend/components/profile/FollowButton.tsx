import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FollowButtonProps {
  following: boolean;
  handleFollow: () => void;
}

const FollowButton = ({ following, handleFollow }: FollowButtonProps) => {
  const [hovered, setHovered] = useState(false);

  const buttonText = following
    ? hovered
      ? "Unfollow?"
      : "Following"
    : hovered
      ? "Follow?"
      : "Follow";

  return (
    <Button
      onClick={handleFollow}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${
        following
          ? "bg-transparent border border-border text-foreground"
          : "bg-gradient-to-r from-primary to-secondary text-white"
      } mt-[0.5rem] rounded-full transition-all duration-200`}
    >
      {buttonText}
    </Button>
  );
};

export default FollowButton;
