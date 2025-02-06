"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Bot, MessageCircleMore } from "lucide-react";

export default function LeftSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Train",
      icon: Bot,
      href: "/train",
    },
    {
      title: "Chat",
      icon: MessageCircleMore,
      href: "/chat",
    },
  ];

  return (
    <div className="sticky top-0 flex h-screen w-72 flex-col bg-black px-6 pb-10 gap-8">
      {/* Logo */}
      <Link
        href="/home"
        className="h-16 flex justify-start items-center py-2 w-full"
      >
        <Image
          src={"/logo.svg"}
          alt="Tech pills logo"
          width={52} // Adjust width for proportional scaling
          height={52} // Explicitly setting height to 16 (64px)
          className="h-12 w-auto"
        />
        <p className="text-xl font-medium text-white">Tech pills</p>
      </Link>

      {/* Navigation Items */}
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                isActive
                  ? "bg-purple-600 font-medium text-white"
                  : "text-gray-300 hover:bg-gray-900 hover:text-white"
              )}
            >
              <div className="relative h-6 w-6">
                <item.icon
                  className={cn(
                    "transition-all duration-200",
                    isActive ? "text-white" : "text-gray-300 hover:text-white"
                  )}
                />
              </div>
              <span className="text-base">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
