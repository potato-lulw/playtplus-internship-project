import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface StoryCircleProps {
  image: string;
  label: string;
  hasStory?: boolean;
  isYourStory?: boolean;
}

const StoryCircle = ({ image, label, hasStory = true, isYourStory = false }: StoryCircleProps) => {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer group py-4">
      <div
        className={cn(
          "relative rounded-md p-[2px] transition-transform group-hover:scale-105",
          hasStory && "bg-gradient-to-tr from-primary via-secondary to-primary"
        )}
      >
        <Avatar className="w-16 h-16 border-4 border-card rounded-md">
          <AvatarImage  src={image} alt={label} className="!rounded-md" />
          {/* <AvatarFallback>{label.slice(0, 2).toUpperCase()}</AvatarFallback> */}
        </Avatar>
        {isYourStory && (
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-md border-2 border-card flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">+</span>
          </div>
        )}
      </div>
      <span className="text-xs font-medium text-foreground truncate max-w-[70px] text-center">
        {label}
      </span>
    </div>
  );
};

export default StoryCircle;
