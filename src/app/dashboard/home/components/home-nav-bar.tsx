"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { title } from "process";
import React from "react";

const navLinks = [
  {
    title: "For you",
    href: "/dashboard/home",
  },
  {
    title: "Trending",
    href: "/dashboard/home/trending",
  },
  {
    title: "News",
    href: "/dashboard/home/news",
  },
  {
    title: "Sports",
    href: "/dashboard/home/sports",
  },
] as const;
const HomeNavBar = () => {
  const path = usePathname();
  return (
    <div className="absolute top-0 z-50 flex h-[70px] w-full flex-row border-b-2 border-border/40 bg-background/90 backdrop-blur-sm">
      <nav className="w-full">
        <div className="flex h-full w-full flex-row items-center justify-around gap-4 p-4">
          {navLinks.map((n) => (
            <NavLink
              title={n.title}
              href={n.href}
              isActive={n.href === path}
              key={n.href}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default HomeNavBar;

export const NavLink = ({
  title,
  isActive,
  href,
}: {
  title: string;
  isActive: boolean;
  href: string;
}) => {
  return (
    <Link href={href}>
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
    </Link>
  );
};
