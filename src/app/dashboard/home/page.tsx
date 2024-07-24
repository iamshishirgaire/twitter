import AddPost from "@/app/dashboard/components/addTweet";
import { TweetList } from "../components/tweetList";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="border-b border-border p-6">
        <AddPost />
      </div>
      <div className="space-y-1">
        <TweetList />
      </div>
    </div>
  );
}
