import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Tweets from "@/lib/models/Tweets";
import {
  ArrowPathIcon,
  ArrowUpOnSquareIcon,
  ChatBubbleBottomCenterIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import { UserAvatar } from "../messages/components/messageTile";
import { getTimeDifference } from "@/lib/utils";
import { useQuery } from "react-query";
import api from "@/lib/api";
import Users from "@/lib/models/Users";

const Tweet = ({ tweet }: { tweet: Tweets }) => {
  return (
    <div className="border-b border-border bg-background p-6">
      <div className="flex items-start gap-4">
        <UserAvatar userId={tweet.user_id} />
        <TweetInfo tweet={tweet} />
      </div>
    </div>
  );
};

export default Tweet;

function TweetInfo({ tweet }: { tweet: Tweets }) {
  const { data } = useQuery(`user-detail-${tweet.user_id}`, async () => {
    const res = await api.get<Users>(`/user?id=${tweet.user_id}`);
    return res.data;
  });
  return (
    <div className="flex-1">
      <div className="flex w-full items-center gap-2">
        <div className="flex items-center gap-2">
          <p className="font-bold">{data?.first_name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{data?.user_name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {getTimeDifference(tweet.updated_at.toString())}
          </p>
          {tweet.edited && (
            <p className="text-sm text-gray-500 dark:text-gray-400">Edited</p>
          )}
        </div>
      </div>
      <p className="mt-2">{tweet.content}</p>
      {tweet.media_url &&
        tweet.media_url.map((e) => {
          return (
            <Image
              src={e}
              width={600}
              height={300}
              alt={`Tweet Image of ${tweet.content} `}
              className="mt-4"
            />
          );
        })}
      <div className="mt-4 flex gap-2">
        <Button variant="ghost" size="icon">
          <ChatBubbleBottomCenterIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <ArrowPathIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <HeartIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <ArrowUpOnSquareIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
