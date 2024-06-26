import { cn } from "@/lib/utils";
import { title } from "process";
import React from "react";

const navLinks = [
  {
    title: "For you",
    href: "/for-you",
  },
  {
    title: "Trending",
    href: "/trending",
  },
  {
    title: "News",
    href: "/news",
  },
  {
    title: "Sports",
    href: "/sports",
  },
] as const;
const HomeNavBar = () => {
  return (
    <div className="absolute top-0 z-10 flex h-[70px] w-full flex-row border-b-2 border-border/40 bg-background/90 backdrop-blur-sm">
      <nav className="w-full">
        <div className="flex h-full w-full flex-row items-center justify-around gap-4 p-4">
          {navLinks.map((n) => (
            <HomeNavLink
              title={n.title}
              href={n.href}
              isActive={n.title === "For you"}
              key={title}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default HomeNavBar;

export const HomeNavLink = ({
  title,
  isActive,
  href,
}: {
  title: string;
  isActive: boolean;
  href: string;
}) => {
  return (
    <div className="mt-2 flex flex-col">
      <div className="flex flex-row">
        <div className="flex flex-row items-center gap-2">
          <p
            className={cn(
              "text-md font-bold",
              isActive ? "text-primary" : "text-gray-400",
            )}
          >
            {title}
          </p>
        </div>
      </div>
      <div
        className={cn("mt-2 h-1", isActive ? "bg-primary" : "bg-transparent")}
      ></div>
    </div>
  );
};
