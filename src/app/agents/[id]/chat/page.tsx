import Chat from "@/components/chat";
import { getAgentById } from "@/services/agents";
import React from "react";

export default async function AgentChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const agent = await getAgentById(id);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-[40rem] h-full max-h-[40rem] flex justify-center items-center">
        <span className="hidden">{agent.name}</span>
        <Chat />
      </div>
    </div>
  );
}
