import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MessageTile from "./components/messageTile";
import HomeNavBar from "./components/home-nav-bar";
import RightSideBar from "./components/rightSideBar";
import MobileNav from "./components/mobileNav";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen w-full grid-cols-1 xl:grid-cols-[700px_1fr]">
      <div className="flex lg:hidden">
        <MobileNav />
      </div>
      <ScrollArea
        scrollHideDelay={0}
        className="p-x-6 overflow-y-auto border-e border-border"
      >
        <div>
          <HomeNavBar />
        </div>
        <div className="fixed bottom-10 right-20 z-20 cursor-pointer">
          <MessageTile />
        </div>
        <div className="space-y-1">{children}</div>
        <ScrollBar className="me-1 w-[1px]" />
      </ScrollArea>
      <div className="hidden xl:flex">
        <RightSideBar />
      </div>
    </div>
  );
}
