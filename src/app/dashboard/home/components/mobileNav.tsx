"use client";
import { useAuthStore } from "@/store/auth.store";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { UserAvatar } from "./messageTile";
import Sidebar from "@/components/sidebar";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileNav = () => {
  const userId = useAuthStore((state) => state.user?.id);
  const [hidden, setHidden] = useState(false);

  if (!userId) {
    useAuthStore.getState().getCurrentUser();
  }

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: hidden ? -60 : 0 }}
      transition={{ duration: 0.3 }}
      className={`flex h-[60px] w-full flex-row justify-between border-b border-border/40 px-5 pb-3 pt-3`}
    >
      {!userId && <div className="size-8 rounded-full bg-popover"></div>}
      {userId && (
        <Sheet>
          <SheetTrigger>
            <UserAvatar userId={userId} />
          </SheetTrigger>
          <SheetContent side={"left"} className="border-none">
            <Sidebar isMobile={true} />
          </SheetContent>
        </Sheet>
      )}

      <Image src="/twitter.svg" alt="logo" priority width={40} height={40} />
      <p className="text-xl font-bold">Premium</p>
    </motion.div>
  );
};

export default MobileNav;
