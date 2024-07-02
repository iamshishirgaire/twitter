"use client";
import Spinner from "@/components/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import api from "@/lib/api";
import type MessageChannels from "@/lib/models/MessageChannels";
import { cn, getTimeDifference } from "@/lib/utils";
import Link from "next/link";
import { useQuery } from "react-query";

export interface MessageTileProps {
  content: string;
  media_url: null;
  created_at: string;
  updated_at: string;
  other_user_name: string;
  other_user_profile_picture: string;
}

export const ChannelTile = ({
  msgChannel,
  isActive,
}: {
  msgChannel: MessageChannels;
  isActive: boolean;
}) => {
  const { data, isLoading, isError } = useQuery(
    `channel-detail-${msgChannel.id}`,
    async () => {
      const channelInfo = await api.get<MessageTileProps[]>(
        `/message/channel/info?id=${msgChannel.id}`,
      );
      return channelInfo.data[0];
    },
  );

  if (isLoading) {
    return <ChannelTileSkeleton />;
  }
  if (isError || !data) {
    return <div>{"Failed to load channels"}</div>;
  }
  return (
    <Link
      href={`/dashboard/messages/${msgChannel.id}`}
      className={cn(
        "mx-1 my-1 flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-muted",
        isActive ? "bg-muted" : "",
      )}
    >
      <Avatar className="h-10 w-10 border border-border/25">
        <AvatarImage src={data?.other_user_profile_picture} />
        <AvatarFallback>{data?.other_user_name}</AvatarFallback>
      </Avatar>

      <div className="flex-1 truncate">
        <div className="font-medium">{data?.other_user_name}</div>
        <p className="truncate text-sm text-muted-foreground">
          {" "}
          {data?.content ?? data?.media_url}
        </p>
      </div>
      <div className="text-xs text-muted-foreground">
        {getTimeDifference(data?.created_at)}
      </div>
    </Link>
  );
};

export const ChannelTileSkeleton = () => {
  return (
    <div className="mx-1 my-1 flex animate-pulse items-center gap-3 rounded-md bg-muted/60 p-3 transition-colors">
      <Avatar className="h-10 w-10 border border-border/25">
        <AvatarFallback>{}</AvatarFallback>
      </Avatar>

      <div className="flex-1 truncate">
        <div className="h-4 animate-pulse rounded-lg bg-muted/80 font-medium">
          {}
        </div>
        <p className="mt-1 h-4 w-[50%] animate-pulse truncate rounded-lg bg-muted/80 text-sm text-muted-foreground">
          {}
        </p>
      </div>
      <div className="text-xs text-muted-foreground">{}</div>
    </div>
  );
};

export const ChannelHeader = ({ channelId }: { channelId: string }) => {
  const { data, isLoading, isError } = useQuery("channel-detail", async () => {
    const channelInfo = await api.get<MessageTileProps[]>(
      `/message/channel/info?id=${channelId}`,
    );
    return channelInfo.data[0];
  });

  if (isLoading) {
    return null;
  }
  if (isError || !data) {
    return <div>{"Failed to load channels"}</div>;
  }
  return (
    <Link
      href={`/dashboard/messages/${channelId}`}
      className="mx-1 my-1 flex cursor-pointer items-center gap-3 rounded-md p-3"
    >
      <Avatar className="h-10 w-10 border border-border/25">
        <AvatarImage src={data?.other_user_profile_picture} />
        <AvatarFallback>{data?.other_user_name}</AvatarFallback>
      </Avatar>

      <div className="flex-1 truncate">
        <div className="font-medium">{data?.other_user_name}</div>
      </div>
    </Link>
  );
};
