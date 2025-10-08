"use client";
import Image from "next/image";
import { useMemo } from "react";
import { getColorFromName, getInitials } from "@/utils/utils";
import { useSession } from "next-auth/react";

const ProfilePicture = ({avatar, name}: {avatar: string, name: string}) => {
  // console.log(avatar, name)
  const profilePicture = useMemo(() => avatar, [avatar]);
  const initials = useMemo(() => getInitials(name || ""), [name]);
  const colorName = useMemo(() => getColorFromName(name || ""), [name]);

  return  profilePicture ? (
    <div className="relative w-24 h-24 md:w-32 md:h-32 border-4 rounded-md border-background  object-cover">
      <Image
        src={profilePicture!}
        fill
        alt="Profile Picture"
        className=" object-cover"
      />
    </div>

  ) : (
    <div
      className={`flex items-center justify-center text-white font-bold text-2xl w-24 h-24 md:w-32 md:h-32 rounded-md border-4 border-background ${colorName}`}
    >
      {initials}
    </div>

  );
};

export default ProfilePicture;
