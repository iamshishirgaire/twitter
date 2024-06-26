import Sidebar from "@/components/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid h-screen w-screen grid-cols-[500px_1fr] bg-background">
      <div className="h-full border-e border-border">
        <Sidebar></Sidebar>
      </div>
      {children}
    </main>
  );
};

export default DashboardLayout;
