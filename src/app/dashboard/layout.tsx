import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="flex flex-1">
          <aside className="max-w-96">
            <Sidebar />
          </aside>
          <div className="w-full flex flex-col">
            <Navbar />
            <main className="flex-1 overflow-auto bg-slate-300">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
