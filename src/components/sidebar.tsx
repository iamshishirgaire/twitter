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

const SidebarLinks = [
  {
    title: "Home",
    href: "/dashboard",
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
    href: "/dashboard/notifications",
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

const Sidebar = () => {
  const pathName = usePathname();

  function isActive(href: string) {
    const isActive =
      pathName === href ||
      (href === "/dashboard/messages" &&
        pathName.startsWith("/dashboard/messages"));
    return isActive;
  }

  return (
    <div className="flex h-full w-full flex-col items-end justify-center pe-10">
      <div className="flex h-full flex-col gap-4 pt-10">
        <Link
          href={"/dashboard"}
          className="ms-2 flex h-52 w-16 cursor-pointer items-center justify-center rounded-lg bg-gray-300/20 hover:bg-gray-300/30"
        >
          <p className="font-mono text-3xl font-bold text-foreground">Y</p>
        </Link>
        {SidebarLinks.map((link) => {
          const isActive =
            pathName === link.href ||
            (link.href === "/dashboard/messages" &&
              pathName.startsWith("/dashboard/messages"));

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
          <AlertDialogTrigger className="rounded-lg">
            <div className="w-full rounded-lg bg-primary py-3 text-lg font-semibold text-background hover:bg-primary/90 dark:text-foreground">
              Tweet
            </div>
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
              <DialogHeader>
                <ProfileTile />
              </DialogHeader>
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
