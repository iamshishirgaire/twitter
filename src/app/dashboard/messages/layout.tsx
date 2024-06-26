import PageTitle from "@/components/pageTitle";
import Spacer from "@/components/spacer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InboxIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

const MessageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-[1fr_2fr]">
      <div className="border-r border-border">
        <PageTitle title="Messages" className="border-b border-border/55 p-4">
          <Link href="#" className="flex items-center gap-2">
            <SettingsIcon size={20} />
            <Spacer width={2} />
            <InboxIcon size={20} />
          </Link>
        </PageTitle>
        <ScrollArea>
          <Link
            href="#"
            className="mx-1 my-1 flex items-center gap-3  rounded-md p-3 transition-colors hover:bg-muted"
            prefetch={false}
          >
            <Avatar className="h-10 w-10 border border-border/25">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>C1</AvatarFallback>
            </Avatar>

            <div className="flex-1 truncate">
              <div className="font-medium">Channel 1</div>
              <p className="truncate text-sm text-muted-foreground">
                Hey, did you see the latest update?
              </p>
            </div>
            <div className="text-xs text-muted-foreground">2h</div>
          </Link>
        </ScrollArea>
      </div>
      {children}
    </div>
  );
};

export default MessageLayout;
