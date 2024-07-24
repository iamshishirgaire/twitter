import Sidebar from "@/components/sidebar";
import React from "react";
import HomeNavBar from "./home/components/home-nav-bar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid h-screen w-screen grid-cols-[650px_1fr] bg-background">
      <div className="hlimit-full border-e border-border pe-10">
        <Sidebar></Sidebar>
      </div>
      {children}
    </main>
  );
};

export default DashboardLayout;
