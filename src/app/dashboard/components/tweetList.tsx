"use client";

import Spinner from "@/components/spinner";
import api from "@/lib/api";
import Tweets from "@/lib/models/Tweets";
import { useQuery } from "react-query";
import Tweet from "./tweet";

export function TweetList() {
  const { data, isLoading, isError } = useQuery("tweets", async () => {
    const res = await api.get<Tweets[]>("/tweet/all");
    return res.data;
  });
  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>Failed to fetch Posts</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {data?.length === 0 && (
        <div className="mt-10 flex justify-center">
          <p>No Posts available</p>
        </div>
      )}
      {data?.map((e) => {
        return <Tweet tweet={e} />;
      })}
    </div>
  );
}
