"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";

const ProfileTile = ({ border }: { border?: boolean }) => {
  const { user } = useAuthStore((state) => state);
  console.log(user);

  if (!user) return null;

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center space-x-4",
        border
          ? "rounded-lg border border-border px-2 py-3 hover:bg-popover"
          : "",
      )}
    >
      <Avatar>
        <AvatarImage src={user.profile_picture ?? undefined} />
        <AvatarFallback>{user.user_name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        <p className="text-md font-semibold">
          {user.first_name && user.last_name
            ? user.first_name + user.last_name
            : user.email}
        </p>
        <p className="text-sm text-gray-500">@{user.user_name}</p>
      </div>
    </div>
  );
};

export default ProfileTile;
