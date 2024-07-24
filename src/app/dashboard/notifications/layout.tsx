"use client";
import PageTitle from "@/components/pageTitle";
import Spacer from "@/components/spacer";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "../home/components/home-nav-bar";
import RightSideBar from "../home/components/rightSideBar";

const notificationLinks = [
  {
    title: "All",
    href: "all",
  },
  {
    title: "Verified",
    href: "verified",
  },
  {
    title: "Mentions",
    href: "mentions",
  },
] as const;
const NotificationLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  console.log("pathName", pathName);
  return (
    <main className="grid h-screen grid-cols-[1fr_1fr] bg-background">
      <div className="relative h-full border-e border-border">
        <div className="absolute top-0 z-10 flex h-[70px] w-full flex-row bg-background/90 backdrop-blur-sm">
          <nav className="w-full">
            <PageTitle title="Notifications" className="p-4">
              <Link href="#" className="flex items-center gap-2">
                <SettingsIcon size={20} />
                <Spacer width={2} />
              </Link>
            </PageTitle>

            <div className="flex h-full w-full flex-row items-center justify-around gap-4 border-b-2 border-border/40 p-4">
              {notificationLinks.map((n) => (
                <NavLink
                  title={n.title}
                  href={`/dashboard/notifications/${n.href}`}
                  isActive={pathName === `/dashboard/notifications/${n.href}`}
                  key={n.title}
                />
              ))}
            </div>
            {children}
          </nav>
        </div>
      </div>
      <div className="flex items-center justify-start ps-10">
        <RightSideBar />
      </div>

      {/* {children} */}
    </main>
  );
};

export default NotificationLayout;
// import Sidebar from "@/components/sidebar";
// import React from "react";

// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <main className="grid h-screen w-screen grid-cols-[500px_1fr] bg-background">
//       <div className="h-full border-e border-border">
//         <Sidebar></Sidebar>
//       </div>
//       {children}
//     </main>
//   );
// };

// export default DashboardLayout;
