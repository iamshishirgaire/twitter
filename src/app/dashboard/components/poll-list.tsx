"use client";

import { getPollIds } from "@/lib/api/tweet";
import { useQuery } from "react-query";
import SinglePollComponent from "./poll";

interface PollListProps {
  id: string;
  user_id: string;
}
export function PollList({ poll }: { poll: PollListProps[] }) {
  const { data, isLoading, isError } = useQuery("pollIds", async () => {
    return await getPollIds();
  });
  if (isError) {
    return null;
  }
  if (isLoading) {
    return (
      <div className="mt-10 flex h-full w-full animate-ping items-center justify-center"></div>
    );
  }

  return (
    <div>
      {data?.map((e) => {
        return <SinglePollComponent key={e.id} id={e.id} userId={e.user_id} />;
      })}
    </div>
  );
}
