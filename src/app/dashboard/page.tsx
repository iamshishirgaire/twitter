import AddPost from "@/app/dashboard/components/addTweet";
import Spacer from "@/components/spacer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import HomeNavBar from "./components/home-nav-bar";
import RightSideBar from "./components/rightSidebar/rightSideBar";
import { TweetList } from "./components/tweetList";
import MessageTile from "./messages/components/messageTile";

export default function Home() {
  return (
    <div className="grid grid-cols-[1fr_600px] gap-6">
      <ScrollArea
        scrollHideDelay={0}
        className="p-x-6 h-screen overflow-y-auto border-e border-border"
      >
        <div className="fixed bottom-10 right-32 cursor-pointer">
          <MessageTile />
        </div>

        <HomeNavBar />
        <Spacer height={70} />
        <div className="space-y-1">
          <div className="border-b border-border p-6">
            <AddPost />
          </div>
          <div className="space-y-1">
            <TweetList />
          </div>
        </div>
        <ScrollBar className="me-1 w-[1px]" />
      </ScrollArea>
      <RightSideBar />
    </div>
  );
}
