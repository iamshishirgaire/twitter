"use client";
import api from "@/lib/api";
import type MessageChannels from "@/lib/models/MessageChannels";
import supabase from "@/lib/supabase";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import MessageChannelTile from "./components/messageChannelTile";

// const MessagesPage = () => {
//   const [messageChannels, setMessageChannels] = React.useState<
//     MessageChannels[]
//   >([]);

//   const { isLoading, error } = useQuery(
//     "user-detail",
//     async () => {
//       const data = await api.get<MessageChannels[]>(
//         "/message/channel?page=0&page_size=20&user_id=157a43c8-f85a-432e-97c4-7527a17e83de",
//       );
//       return data.data;
//     },
//     {
//       onSuccess(data) {
//         setMessageChannels(data);
//       },
//     },
//   );
//   supabase
//     .channel("messages_channels")
//     .on(
//       "postgres_changes",
//       { event: "INSERT", schema: "public", table: "message_channels" },
//       (payload) => {
//         const newChannels = payload.new as MessageChannels;
//         setMessageChannels((prev) => [...prev, newChannels]);
//       },
//     )
//     .subscribe();

//   return (
//     <div>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>Error: {error.toString()}</div>
//       ) : (
//         <div>
//           <ul>
//             {messageChannels.map((channel) => (
//               <li key={channel.id}>
//                 <MessageChannelTile {...channel} />
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessagesPage;

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InfoIcon, SendIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MessagePage() {
  return (
    <div className="flex w-full flex-col">
      <div className="sticky top-0 bg-background p-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10 border border-border/25">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>C1</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">Channel 1</div>
            <p className="text-sm text-muted-foreground">
              Last seen 2 hours ago
            </p>
          </div>
          <Button variant="ghost" size="icon">
            <InfoIcon />
          </Button>
        </div>
      </div>
      <ScrollArea className="h-full flex-col-reverse items-end gap-4 overflow-auto p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border  border-border/25">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
          <div className="max-w-[70%]  rounded-2xl bg-muted p-3">
            <div className="font-medium">John</div>
            <p>Hey, did you see the latest update?</p>
          </div>
        </div>
        <div className="flex items-start  justify-end gap-4">
          <div className="max-w-[70%] rounded-2xl bg-primary p-3  text-primary-foreground">
            <p>Awesome, let&aposs discuss the plan.</p>
          </div>
          <Avatar className="h-10 w-10 border border-border/25">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border border-border/25">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
          <div className="max-w-[70%] rounded-2xl bg-muted p-3">
            <div className="font-medium">John</div>
            <p>I&aposll get that done by the end of the day.</p>
          </div>
        </div>
        <div className="flex items-start justify-end gap-4">
          <div className="max-w-[70%] rounded-2xl bg-primary p-3 text-primary-foreground">
            <p>Sounds good, let&aposs schedule a call.</p>
          </div>
          <Avatar className="h-10 w-10 border border-border/25">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
        </div>
      </ScrollArea>
      <div className="sticky bottom-0 bg-background p-4">
        <div className="relative">
          <Textarea
            placeholder="Type your message..."
            className="resize-none rounded-2xl pr-16"
            rows={1}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
