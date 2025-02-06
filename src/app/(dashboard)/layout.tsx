import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-screen">
        <div className="flex">
          <aside className="max-w-96">
            <Sidebar />
          </aside>
          <div className="w-full min-h-screen">
            <Navbar />
            <main className="w-full container min-h-[calc(100vh-4rem)]">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
