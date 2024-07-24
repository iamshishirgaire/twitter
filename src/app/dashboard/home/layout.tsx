import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MessageTile from "./components/messageTile";
import HomeNavBar from "./components/home-nav-bar";
import RightSideBar from "./components/rightSideBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1fr_600px] gap-6">
      <ScrollArea
        scrollHideDelay={0}
        className="p-x-6 h-screen overflow-y-auto border-e border-border"
      >
        <HomeNavBar />
        <div className="fixed bottom-10 right-32 cursor-pointer">
          <MessageTile />
        </div>
        <div className="space-y-1">{children}</div>
        <ScrollBar className="me-1 w-[1px]" />
      </ScrollArea>
      <RightSideBar />
    </div>
  );
}
