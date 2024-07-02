"use client";

export default function MessagePage() {
  return (
    <div className="flex flex-col items-center  justify-center w-full h-full">
      <div className="max-w-md">
        <p className="font-bold tracking-wide text-4xl mb-2">
          {" "}
          Select a message
        </p>
        <p className=" text-md text-muted-foreground">
          Choose from your existing conversations, start a new one, or just keep
          swimming.
        </p>
      </div>
    </div>
  );
}
