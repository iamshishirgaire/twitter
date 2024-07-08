"use client";
import Spinner from "@/components/spinner";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api/";
import Messages from "@/lib/models/Messages";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { GifIcon } from "@heroicons/react/24/outline";
import {
  ImageIcon,
  InfoIcon,
  Scroll,
  SendHorizonalIcon,
  SmileIcon,
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { ChannelHeader } from "../components/messageChannelTile";
import { UserAvatar } from "../components/messageTile";
import React from "react";

export default function MessagePage({
  params,
}: {
  params: {
    channelId: string;
  };
}) {
  const [message, setMessage] = useState<string | undefined>();
  async function sendMessage(message: string) {
    api.post(`message`, {
      content: message,
      channel_id: params.channelId,
    });
  }
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="h-[60px] w-full border-b border-border/50 bg-background px-5">
        <div className="flex items-center justify-between gap-4">
          <ChannelHeader channelId={params.channelId} />

          <div>
            <Button variant="ghost" size="icon">
              <InfoIcon className="text-white" />
            </Button>
          </div>
        </div>
      </div>
      <MessageContainer channelId={params.channelId} />
      <div className="mb-4 min-w-full bg-background p-2">
        <div className="flex items-center rounded-lg border border-border p-2 text-primary">
          <IconButton onClick={() => {}} tooltipText="Emoji">
            <SmileIcon />
          </IconButton>
          <IconButton onClick={() => {}} tooltipText="Media">
            <ImageIcon />
          </IconButton>
          <IconButton onClick={() => {}} tooltipText="Gif">
            <GifIcon />
          </IconButton>
          <Textarea
            className="min-h-10 flex-1 resize-none overflow-hidden border-none text-white focus-visible:ring-0"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (message) {
                  await sendMessage(message);
                  setMessage("");
                }
              }
            }}
            rows={1}
          />
          <IconButton
            onClick={() => {
              if (message) {
                sendMessage(message);
                setMessage("");
              }
            }}
            tooltipText="Send"
          >
            <SendHorizonalIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export const MessageContainer = ({ channelId }: { channelId: string }) => {
  const { isLoading, data, isError } = useQuery(
    `channel-chats-${channelId}`,
    async () => {
      const messages = await api.get<Messages[]>(
        `message?page=0&page_size=20&channel_id=${channelId}`,
      );
      return messages.data;
    },
    {
      refetchInterval: 5000,
    },
  );

  const userId = useAuthStore((state) => state.user?.id);
  if (!userId) {
    useAuthStore.getState().getCurrentUser();
  }

  {
    if (isLoading) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          {" "}
          <Spinner />{" "}
        </div>
      );
    }
  }
  if (isError) {
    return <div className="h-full w-full">Failed to load messages</div>;
  }
  return (
    <div className="flex h-full w-full flex-col-reverse overflow-auto bg-gray-800 custom-scrollbar">
      {data?.map((e) => {
        return (
          <div
            key={e.id}
            className={cn(
              "flex items-center gap-2 p-2",
              e.sender_id === userId ? "justify-end" : "justify-start",
            )}
          >
            {
              // if the message is sent by the user then show the user avatar on the left side
              // else show the avatar on the right side
              userId === e.sender_id ? (
                <UserAvatar userId={e.sender_id!} />
              ) : null
            }
            <div
              className={cn(
                "max-w-[70%] rounded-2xl p-3 text-primary-foreground",
                e.sender_id === userId ? "bg-primary" : "bg-popover",
              )}
            >
              <p>{e.content}</p>
            </div>
            {
              // if the message is sent by the user then show the user avatar on the right side
              // else show the avatar on the left side
              userId !== e.sender_id ? (
                <UserAvatar userId={e.sender_id!} />
              ) : null
            }
          </div>
        );
      })}
      {data?.map((e) => {
        return (
          <div
            key={e.id}
            className={cn(
              "flex items-center gap-2 p-2",
              e.sender_id === userId ? "justify-end" : "justify-start",
            )}
          >
            {
              // if the message is sent by the user then show the user avatar on the left side
              // else show the avatar on the right side
              userId === e.sender_id ? (
                <UserAvatar userId={e.sender_id!} />
              ) : null
            }
            <div
              className={cn(
                "max-w-[70%] rounded-2xl p-3 text-primary-foreground",
                e.sender_id === userId ? "bg-primary" : "bg-popover",
              )}
            >
              <p>{e.content}</p>
            </div>
            {
              // if the message is sent by the user then show the user avatar on the right side
              // else show the avatar on the left side
              userId !== e.sender_id ? (
                <UserAvatar userId={e.sender_id!} />
              ) : null
            }
          </div>
        );
      })}
    </div>
  );
};
