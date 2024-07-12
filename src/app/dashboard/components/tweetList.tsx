"use client";

import Spinner from "@/components/spinner";
import { getPollIds, getTweets } from "@/lib/api/tweet";
import { useQuery } from "react-query";
import { PollList } from "./poll-list";
import Tweet from "./tweet";

export function TweetList() {
  const { data, isLoading, isError } = useQuery("tweets", async () => {
    const tweets = getTweets();
    const polls = getPollIds();
    const res = await Promise.all([tweets, polls]);

    return {
      tweet: res[0],
      polls: res[1],
    };
  });
  if (isError) {
    return (
      <div className="mt-10 flex h-full w-full items-center justify-center">
        <p>Failed to fetch Posts</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="mt-10 flex h-96 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {data?.tweet.length === 0 && (
        <div className="mt-10 flex justify-center">
          <p>No Posts available</p>
        </div>
      )}

      {data?.polls.length === 0 && <div></div>}
      {data?.polls && <PollList poll={data?.polls} />}
      {data?.tweet?.map((e) => {
        return <Tweet key={e.id} tweet={e} />;
      })}
    </div>
  );
}
