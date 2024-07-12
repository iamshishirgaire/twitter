import { Button } from "@/components/ui/button";
import { Animations } from "@/lib/animations";
import { getPollDetail, votePoll } from "@/lib/api/tweet";
import { getUserDetail } from "@/lib/api/user";
import { parseText } from "@/lib/parse-json-tweet";
import { cn, getTimeDifference } from "@/lib/utils";
import {
  ArrowUpOnSquareIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { BookmarkIcon, EyeIcon, HeartIcon, Repeat2Icon } from "lucide-react";
import { useState } from "react";
import Lottie from "react-lottie";
import { useMutation, useQuery } from "react-query";
import { UserAvatar } from "../messages/components/messageTile";
import toast from "react-hot-toast";

export default function SinglePollComponent({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined,
  );
  const [voteCount, setVoteCount] = useState<number | undefined>(undefined);
  const { data, isLoading, isError } = useQuery(
    "poll",
    async () => {
      let userDetails = getUserDetail(userId);
      let polLDetails = getPollDetail(id);
      let data = await Promise.all([userDetails, polLDetails]);
      return {
        user: data[0],
        poll: data[1],
      };
    },
    {
      onSuccess(data) {
        if (data.poll.voted_option !== -1) {
          setSelectedOption(data.poll.voted_option);
        }
        setVoteCount(parseInt(data.poll.vote_count));
      },
      onError: () => {
        toast.error("Failed to fetch poll");
      },
    },
  );
  const { mutateAsync } = useMutation(
    "vote",
    async () => {
      if (selectedOption === undefined) {
        return;
      }
      await votePoll(id, selectedOption);
      if (data?.poll.voted_option === -1 && voteCount !== undefined) {
        setVoteCount(voteCount + 1);
      }
    },
    {
      onError: (error) => {
        toast.error("Failed to vote");
      },
    },
  );

  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
    mutateAsync();
  };

  if (isError || !data) {
    return null;
  }
  if (isLoading) {
    return null;
  }
  const parsedText = parseText(data.poll.description);

  return (
    <div className="border-b border-border bg-background p-6">
      <div className="flex items-start gap-4">
        <UserAvatar userId={data.poll.user_id} />
        <div className="w-full flex-1">
          <div className="flex w-full items-center gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold">{data.user.first_name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @{data.user.user_name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {getTimeDifference(data.poll.updated_at.toString())}
              </p>
            </div>
          </div>
          <div className="mb-2 mt-1"> {parsedText.components}</div>
          <div className="mt-8">
            {data.poll.results.map((result, index) => (
              <motion.div
                onClick={() => handleOptionClick(index)}
                key={result.option}
                className={cn(
                  "relative m-2 mb-2 flex min-h-16 w-full cursor-pointer items-center justify-between rounded-sm border border-border bg-background",
                  selectedOption === index
                    ? "bg-zinc-700/40 ring-2 ring-zinc-500 hover:bg-zinc-800/40"
                    : "hover:bg-zinc-700/40",
                )}
              >
                {selectedOption === index && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.percentage}%` }}
                    transition={{ duration: 1 }}
                    className="absolute left-0 top-0 h-full rounded-sm bg-stone-700/50"
                  ></motion.div>
                )}
                <p className="relative z-10 py-3 ps-3">{result.option}</p>
                {selectedOption !== undefined && (
                  <div className="flex items-center gap-2">
                    {selectedOption === index ? (
                      <Lottie
                        options={{
                          animationData: Animations.check,
                          loop: false,
                        }}
                        style={{
                          width: 60,
                          height: 60,
                        }}
                      ></Lottie>
                    ) : null}

                    <motion.p
                      initial={{
                        y: 5,
                        opacity: 0,
                      }}
                      animate={{
                        y: 0,
                        opacity: 100,
                      }}
                      className="relative z-10 pe-3"
                    >
                      {result.percentage}%
                    </motion.p>
                  </div>
                )}
              </motion.div>
            ))}
            <div className="flex w-full cursor-pointer justify-end">
              <div className="m-2 flex items-center justify-center gap-1">
                <motion.p
                  initial={{
                    y: 5,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 100,
                  }}
                  className="text-md text-gray-400"
                >
                  {voteCount}
                </motion.p>
                <p className="text-md text-gray-400">Votes</p>
              </div>
            </div>
          </div>

          {/* {data.poll.media_url && <DynamicGrid imageUrls={tweet.media_url} />} */}
          <div className="flex items-center justify-between gap-2 pt-4">
            <Button
              className="m-1 flex items-center justify-center gap-2 text-gray-400 hover:bg-blue-400/10 hover:text-blue-400"
              variant="ghost"
            >
              <ChatBubbleBottomCenterIcon className="size-5" />
              <p> {data.poll.comment_count}</p>
            </Button>
            <Button
              className="m-1 flex items-center justify-center gap-2 text-gray-400 hover:bg-green-400/20 hover:text-green-400"
              variant="ghost"
            >
              <Repeat2Icon className="size-5" />
              <p> {data.poll.retweet_count}</p>
            </Button>
            <Button
              className="m-1 flex items-center justify-center gap-2 text-gray-400 hover:bg-red-400/20 hover:text-red-400"
              variant="ghost"
            >
              <HeartIcon className="size-5" />
              <p> {data.poll.like_count}</p>
            </Button>
            <Button
              className="m-1 flex items-center justify-center gap-2 text-gray-400 hover:bg-yellow-400/20 hover:text-yellow-400"
              variant="ghost"
            >
              <EyeIcon className="size-5" />
              <p> {data.poll.view_count}</p>
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
      </div>
    </div>
  );
}
