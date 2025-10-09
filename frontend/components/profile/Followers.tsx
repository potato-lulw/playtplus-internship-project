"use client";

const Followers = ({ following, followers }: { following: number, followers: number }) => {

  return (

    <div className="flex gap-2 justify-center">
      <p className="font-semibold text-muted-foreground">{followers} Followers</p>
      <p className="font-semibold text-muted-foreground">{following} Following</p>
    </div>
  );
}

export default Followers;
