"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/api";
import Users from "@/lib/models/Users";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";

const MessageTile = () => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-800/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
          <motion.div
            animate={
              open
                ? {
                    scale: 0.9,
                    rotate: 180,
                  }
                : {
                    scale: 1,
                    rotate: 0,
                  }
            }
          >
            <ChevronDownIcon />
          </motion.div>
          {!open && (
            <motion.span className="text-md font-semibold text-gray-800 dark:text-gray-800">
              Messages
            </motion.span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="mb-10 w-[400px] border-border bg-background p-4 shadow-xl shadow-gray-200/70 backdrop-blur-md dark:shadow-gray-900"
      >
        <DropdownMenuLabel className="mb-2 border-b border-border text-lg font-medium">
          Messages
        </DropdownMenuLabel>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">Olivia Davis</div>
              <p className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                {`                Hey, let's discuss the project details tomorrow.
`}{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">John Doe</div>
              <p className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                {`                Sounds good, I'll be there.
`}{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="@shadcn" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">Sarah Adams</div>
              <p className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                {`Can't wait to see the new design!`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="@shadcn" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">Michael Johnson</div>
              <p className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                {`                I'm running late, sorry about that.
`}{" "}
              </p>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MessageTile;

export const UserAvatar = ({
  userId,
  fallbackText,
}: {
  userId: string;
  fallbackText?: string;
}) => {
  const { data } = useQuery(`user-avatar-${userId}}`, async () => {
    const data = await api.get<Users>(`/user?id=${userId}`);
    return data.data;
  });

  return (
    <Avatar className="size-8">
      <AvatarImage src={data?.profile_picture ?? ""} />
      <AvatarFallback>
        {fallbackText ?? data?.user_name?.charAt(0) ?? "Y"}
      </AvatarFallback>
    </Avatar>
  );
};
