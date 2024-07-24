"use client";

import { Button } from "@/components/ui/button";

export default function MessagePage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="max-w-md">
        <p className="mb-2 text-4xl font-bold tracking-wide">
          {" "}
          Select a message
        </p>
        <p className="text-md text-muted-foreground">
          Choose from your existing conversations, start a new one, or just keep
          swimming.
        </p>
        <Button className="mt-5 rounded-3xl px-4 text-lg" size={"lg"}>
          New conversation
        </Button>
      </div>
    </div>
  );
}
