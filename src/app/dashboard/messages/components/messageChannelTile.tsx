"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getUserDetail from "@/lib/getUserDetails";
import type MessageChannels from "@/lib/models/MessageChannels";
import { useAuthStore } from "@/store/auth.store";
import React from "react";
import { useQuery } from "react-query";

const MessageChannelTile = (channel: MessageChannels) => {
  const { id, users } = channel;
  const userId = useAuthStore((state) => state.user?.id);

  if (!users || !userId) return null;
  const anotherUserId = userId === users[0] ? users[1] : users[0];
  const { isLoading, data } = useQuery(["user", users[0]], () =>
    getUserDetail(anotherUserId),
  );

  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={data?.profile_picture ?? ""} alt={data?.user_name} />
        <AvatarFallback>{data?.user_name}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="font-medium">{data?.first_name}</div>
        <p className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
          {`                Hey, let's discuss the project details tomorrow.
`}{" "}
        </p>
      </div>
    </div>
  );
};

export default MessageChannelTile;
