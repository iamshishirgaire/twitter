import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import Tweets from "@/lib/models/Tweets";
import Users from "@/lib/models/Users";
import { parseText } from "@/lib/parse-json-tweet";
import { getTimeDifference } from "@/lib/utils";
import {
  ArrowUpOnSquareIcon,
  ChatBubbleBottomCenterIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon, EyeIcon, Repeat2Icon } from "lucide-react";
import Image from "next/image";
import { useQuery } from "react-query";
import { UserAvatar } from "../messages/components/messageTile";

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
  const parsedText = parseText(tweet.content);
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
      <div> {parsedText.components}</div>
      {tweet.media_url &&
        tweet.media_url.map((e) => {
          return (
            <Image
              key={e}
              src={e}
              width={600}
              height={300}
              alt={`Tweet Image of ${tweet.content}`}
              className="mt-4"
            />
          );
        })}
      <div className="flex items-center justify-between gap-2 pt-4">
        <Button
          className="m-1 flex items-center justify-center gap-2 text-gray-400 hover:bg-blue-400/10 hover:text-blue-400"
          variant="ghost"
        >
          <ChatBubbleBottomCenterIcon className="size-5" />
          <p> {tweet.comment_count}</p>
        </Button>
        <Button
          className="m-1 flex items-center justify-center gap-2 text-gray-400 hover:bg-green-400/20 hover:text-green-400"
          variant="ghost"
        >
          <Repeat2Icon className="size-5" />
          <p> {tweet.retweet_count}</p>
        </Button>
        <Button
          className="m-1 flex items-center justify-center gap-2 text-gray-400 hover:bg-red-400/20 hover:text-red-400"
          variant="ghost"
        >
          <HeartIcon className="size-5" />
          <p> {tweet.like_count}</p>
        </Button>
        <Button
          className="m-1 flex items-center justify-center gap-2 text-gray-400 hover:bg-yellow-400/20 hover:text-yellow-400"
          variant="ghost"
        >
          <EyeIcon className="size-5" />
          <p> {tweet.view_count}</p>
        </Button>
        <div className="m-1 flex items-center justify-center gap-2">
          <Button
            className="m-1 flex items-center justify-center gap-2 text-gray-400 hover:bg-blue-400/10 hover:text-blue-400"
            variant="ghost"
          >
            <ArrowUpOnSquareIcon className="size-5" />
          </Button>
          <Button
            className="m-1 flex items-center justify-center gap-2 text-gray-400 hover:bg-blue-400/10 hover:text-blue-400"
            variant="ghost"
          >
            <BookmarkIcon className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
