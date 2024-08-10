"use client";
import ProfileTile from "@/app/dashboard/components/profileTile";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
  Cog6ToothIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  BellIcon as BellIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  ChatBubbleBottomCenterIcon as ChatBubbleBottomCenterIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  HomeIcon as HomeIconSolid,
  MagnifyingGlassCircleIcon as MagnifyingGlassIconSolid,
  UserCircleIcon as UserCircleIconSolid,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddPost from "../app/dashboard/components/addTweet";
import Logout from "./logout";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";

const SidebarLinks = [
  {
    title: "Home",
    href: "/dashboard/home",
    icon: HomeIcon,
    activeIcon: HomeIconSolid,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: ChatBubbleBottomCenterIcon,
    activeIcon: ChatBubbleBottomCenterIconSolid,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications/all",
    icon: BellIcon,
    activeIcon: BellIconSolid,
  },
  {
    title: "Explore",
    href: "/dashboard/explore",
    icon: MagnifyingGlassIcon,
    activeIcon: MagnifyingGlassIconSolid,
  },
  {
    title: "Bookmarks",
    href: "/dashboard/bookmarks",
    icon: BookmarkIcon,
    activeIcon: BookmarkIconSolid,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UserCircleIcon,
    activeIcon: UserCircleIconSolid,
  },

  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Cog6ToothIcon,
    activeIcon: Cog6ToothIconSolid,
  },
];

const Sidebar = ({ isMobile }: { isMobile?: boolean }) => {
  const pathName = usePathname();

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-end justify-center pe-10",
        isMobile && "items-start pe-3",
      )}
    >
      <div className="flex h-full flex-col gap-4 pt-10">
        <Link
          href={"/dashboard"}
          className="flex cursor-pointer items-center justify-start ps-10"
        >
          <Image
            src="/twitter.svg"
            alt="logo"
            priority
            width={50}
            height={50}
          />
        </Link>
        {SidebarLinks.map((link) => {
          const isActive =
            pathName === link.href ||
            (link.href === "/dashboard/messages" &&
              pathName.startsWith("/dashboard/messages")) ||
            (link.href === "/dashboard/home" &&
              pathName.startsWith("/dashboard/home"));
          return (
            <Link
              key={link.title}
              href={link.href}
              className="me-4 flex items-center gap-4 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-zinc-700/30"
            >
              {isActive ? (
                <link.activeIcon className="size-6 text-foreground" />
              ) : (
                <link.icon className="h-6 w-6 text-gray-700 dark:text-gray-400" />
              )}
              <span
                className={cn(
                  "text-lg font-bold",
                  isActive
                    ? "text-gray-400 dark:text-foreground"
                    : "text-foreground/45",
                )}
              >
                {link.title}
              </span>
            </Link>
          );
        })}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full rounded-3xl bg-primary py-6 text-lg font-semibold text-background hover:bg-primary/90 focus-visible:ring-blue-400 dark:text-foreground">
              Post
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="top-[300px] m-0 border-none bg-zinc-100 dark:bg-zinc-900">
            <AlertDialogHeader>
              <AlertDialogTitle>
                <div className="mb-4 flex w-min flex-col" />
              </AlertDialogTitle>
              <AddPost />
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
        <div className="mb-20 flex h-full w-full items-end">
          <Dialog>
            <DialogTrigger>
              <ProfileTile border />
            </DialogTrigger>
            <DialogContent className="border-none bg-zinc-100 dark:bg-zinc-900 sm:max-w-[450px]">
              <DialogHeader>Profile</DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                <ProfileTile />
              </DialogTitle>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email
                  </div>
                  <div className="text-sm">shishir@example.com</div>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Location
                  </div>
                  <div className="text-sm">Kathmandu, Nepal</div>
                </div>
                <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Bio
                  </div>
                  <div className="text-sm">
                    {`I'm a software engineer, and I love to code! I'm passionate
                    about building great products and helping others.`}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Logout />
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
