import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ArrowPathIcon,
  ArrowUpOnSquareIcon,
  ChatBubbleBottomCenterIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const Post = () => {
  return (
    <div className="border-b border-border bg-background p-6">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage
            height={20}
            width={20}
            src="/placeholder.svg"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="font-bold">Shadcn</div>
            <div className="text-gray-500 dark:text-gray-400">@shadcn</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">2h</div>
          </div>
          <p className="mt-2">
            {`Excited to share that we've just launched our new
                    product! Check it out and let us know what you think.`}
          </p>
          <Image
            src="/placeholder.svg"
            width={600}
            height={300}
            alt="Blog post Image height={20} width={20}"
            className="mt-4"
          />
          <div className="mt-4 flex gap-2">
            <Button variant="ghost" size="icon">
              <ChatBubbleBottomCenterIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ArrowPathIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <HeartIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ArrowUpOnSquareIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
