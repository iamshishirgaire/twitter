"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import api from "@/lib/api/";
import Users from "@/lib/models/Users";
import { cn } from "@/lib/utils";
import { useQuery } from "react-query";

const PopupProfileTile = ({ userName }: { userName: string }) => {
  const { data, isLoading, isError } = useQuery(
    `user-details-${userName}`,
    async () => {
      const res = await api.get<Users>(`/user?user_name=${userName}`);
      return res.data;
    },
  );

  if (!data || isError)
    return (
      <div className="h-[40px] w-[50px] bg-popover">
        <p className="text-foreground">No info</p>
      </div>
    );
  if (isLoading)
    return <div className="h-[40px] w-[50px] animate-pulse bg-popover"></div>;
  return (
    <div
      className={cn("flex cursor-pointer items-center space-x-4 bg-popover")}
    >
      <Avatar>
        <AvatarImage src={data.profile_picture ?? undefined} />
        <AvatarFallback>{data.user_name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        <p className="text-md font-semibold">
          {data.first_name && data.last_name
            ? data.first_name + data.last_name
            : data.email}
        </p>
        <p className="text-sm text-gray-500">@{data.user_name}</p>
      </div>
    </div>
  );
};

export default PopupProfileTile;
