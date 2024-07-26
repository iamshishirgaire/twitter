import Sidebar from "@/components/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid h-screen w-screen grid-cols-1 bg-background xl:grid-cols-[2fr_4fr]">
      <div className="hidden h-full border-e border-border pe-10 xl:flex">
        <Sidebar></Sidebar>
      </div>
      {children}
    </main>
  );
};

export default DashboardLayout;
