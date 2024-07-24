"use client";
import api from "@/lib/api";
import React from "react";
import { useQuery } from "react-query";
import { ChannelTileSkeleton } from "../../messages/components/messageChannelTile";
import NotificationTile from "../components/notificaton_tile";
import Notifications from "@/lib/models/Notifications";
import Image from "next/image";

const NotificationsPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data, isLoading, isError } = useQuery(
    `notification-${params.id}`,
    async () => {
      const notification = await api.get<Notifications[]>(
        `/notification?type=${params.id}&page=0&page_size=20`,
      );
      return notification.data;
    },
  );
  // if (isLoading) {
  //   return (
  //     <div className="flex w-full flex-col gap-3 px-10 pt-3">
  //       <ChannelTileSkeleton />
  //       <ChannelTileSkeleton />
  //       <ChannelTileSkeleton />
  //       <ChannelTileSkeleton />
  //     </div>
  //   );
  // }
  if (isError || !data || isLoading) {
    return (
      <div className="mt-52 flex h-full w-full flex-col items-center justify-center">
        <div className="mt-20 flex max-w-md flex-col items-center">
          <Image
            alt="Empty notification Illustrations"
            src="/gradening.svg"
            width={200}
            height={200}
            className="mb-10"
          />
          <p className="mb-2 text-4xl font-bold tracking-wide">
            {" "}
            Nothing to see here — yet
          </p>
          <p className="text-md my-3 text-muted-foreground">
            Likes, mentions, reposts, and a whole lot more — when it comes from
            a verified account, you’ll find it here.{" "}
            <span className="mt-3 block text-gray-400 underline">
              Learn more
            </span>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div>
      {data.map((notification) => (
        <NotificationTile key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationsPage;
