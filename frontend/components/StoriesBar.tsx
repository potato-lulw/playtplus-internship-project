"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StoryCircle from "./StoriesCircle";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Story {
  id: string;
  image: string;
  label: string;
  hasStory?: boolean;
  isYourStory?: boolean;
}

interface StoriesBarProps {
  stories: Story[];
}

const StoriesBar = ({ stories }: StoriesBarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  useEffect(() => {
    console.log(canScrollLeft, canScrollRight)
  }, [canScrollLeft, canScrollRight])


  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.2;
    el.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl ">
      {/* Left Arrow */}
      {canScrollLeft && (
        <Button
          size="icon"
          onClick={() => scroll("left")}
          className="absolute md:-left-10 left-0 top-1/2 -translate-y-[70%] z-10 rounded-full bg-primary/70 backdrop-blur-md shadow-md hover:scale-105 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      )}

      {/* The viewport here gets the ref */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar "
        >
          {stories.map((story) => (
            <StoryCircle
              key={story.id}
              image={story.image}
              label={story.label}
              hasStory={story.hasStory}
              isYourStory={story.isYourStory}
            />
          ))}
        </div>
        {/* <ScrollBar orientation="horizontal" /> */}
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <Button
          size="icon"
          onClick={() => scroll("right")}
          className="absolute md:-right-10 right-0 top-1/2 -translate-y-[70%] z-10 rounded-full bg-primary/70 backdrop-blur-md shadow-md hover:scale-105 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

export default StoriesBar;
