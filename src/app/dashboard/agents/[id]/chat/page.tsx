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

  if(!agent) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div>Agent not found</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-center items-center">
      {agent?.id}
      {agent?.name}
      {agent?.description}
      {agent?.index_name}
      <div className="w-[40rem] h-[40rem]">
        <Chat></Chat>
      </div>
    </div>
  );
}
