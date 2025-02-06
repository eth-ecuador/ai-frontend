import Chat from "@/components/chat";
import React from "react";

export default function ChatPage() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-[40rem] h-[40rem]">
        <Chat></Chat>
      </div>
    </div>
  );
}
