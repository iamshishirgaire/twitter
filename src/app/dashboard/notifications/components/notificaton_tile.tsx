import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Notifications from "@/lib/models/Notifications";
import { cn, getTimeDifference } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { UserAvatar } from "../../home/components/messageTile";

const NotificationTile = ({
  notification,
}: {
  notification: Notifications;
}) => {
  return (
    <Link
      href={
        notification.post_type === "tweet"
          ? `/dashboard/twees/${notification.tweet_id}`
          : `/dashboard/polls/${notification.poll_id}`
      }
      className={cn(
        "mx-1 my-1 flex items-center gap-3 rounded-md p-3 transition-colors hover:bg-muted",
      )}
    >
      <UserAvatar userId={notification.user_id} />

      <div className="flex-1 truncate">
        <div className="font-medium">{notification.message}</div>
        <p className="truncate text-sm text-muted-foreground"></p>
      </div>
      <div className="text-xs text-muted-foreground">
        {getTimeDifference(notification.created_at.toString())}
      </div>
      <div>
        {notification.seen && (
          <div className="h-2 w-2 rounded-full bg-primary"></div>
        )}
      </div>
    </Link>
  );
};

export default NotificationTile;
