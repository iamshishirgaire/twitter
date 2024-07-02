"use client";
import PageTitle from "@/components/pageTitle";
import Spacer from "@/components/spacer";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/lib/api";
import MessageChannels from "@/lib/models/MessageChannels";
import supabase from "@/lib/supabase";
import { InboxIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import {
  ChannelTile,
  ChannelTileSkeleton,
} from "./components/messageChannelTile";
import { usePathname } from "next/navigation";

const MessageLayout = ({ children }: { children: React.ReactNode }) => {
  const [messageChannels, setMessageChannels] = React.useState<
    MessageChannels[]
  >([]);

  const { isLoading, error } = useQuery(
    "message-channels",
    async () => {
      const data = await api.get<MessageChannels[]>(
        "/message/channel?page=0&page_size=20&user_id=157a43c8-f85a-432e-97c4-7527a17e83de"
      );
      return data.data;
    },
    {
      onSuccess(data) {
        setMessageChannels(data);
      },
    }
  );

  supabase
    .channel("messages_channels")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "message_channels" },
      (payload) => {
        const newChannels = payload.new as MessageChannels;
        setMessageChannels((prev) => [...prev, newChannels]);
      }
    )
    .subscribe();

  const pathName = usePathname();
  return (
    <div className="grid grid-cols-[1fr_2fr]">
      <div className="border-r border-border">
        <PageTitle title="Messages" className="border-b border-border/55 p-4">
          <Link href="#" className="flex items-center gap-2">
            <SettingsIcon size={20} />
            <Spacer width={2} />
            <InboxIcon size={20} />
          </Link>
        </PageTitle>
        <ScrollArea>
          {isLoading ? (
            <>
              <ChannelTileSkeleton />
              <ChannelTileSkeleton />
              <ChannelTileSkeleton />
              <ChannelTileSkeleton />
            </>
          ) : error ? (
            <div className="flex items-center justify-center font-bold text-2xl">
              Failed to load channels
            </div>
          ) : (
            <ul>
              {messageChannels.map((channel) => (
                <li
                  className="py-1 border-b-0 border-border/25"
                  key={channel.id}
                >
                  <ChannelTile
                    msgChannel={channel}
                    isActive={pathName.includes(channel.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </div>
      {children}
    </div>
  );
};

export default MessageLayout;
