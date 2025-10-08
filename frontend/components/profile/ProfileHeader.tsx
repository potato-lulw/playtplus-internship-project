"use client";
import Image from "next/image";
import { Upload, EllipsisVertical, ArrowLeft } from "lucide-react";
import CreatePostDialog from "./CreatePostDialog";
import ThemeToggle from "../ThemeToggle";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProfileHeader = ({cover, isOther = false}: {cover: string, isOther?: boolean}) => {

  const router = useRouter();
  return (
    <div className="w-full h-[25vh] relative overflow-hidden md:rounded-md">
      <div className="absolute top-4 left-4 text-white z-10" onClick={() => router.back()}>
        <ArrowLeft color="#fff" size={22} />
      </div>
      <Image
        src={ cover || "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=1332&auto=format&fit=crop"}
        alt="cover-image"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute top-4 right-4 flex gap-2 items-center ">
        <ThemeToggle className="rounded-full bg-transparent text-white hover:bg-transparent hover:text-white border-none" />
        {!isOther && <CreatePostDialog />}
        <EllipsisVertical size={22} color="#fff" />
      </div>
    </div>
  );
};

export default ProfileHeader;
