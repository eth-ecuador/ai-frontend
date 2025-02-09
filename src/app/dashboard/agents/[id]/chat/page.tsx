import Chat from "@/components/chat";
import { getAgentById } from "@/services/agents";
import React from "react";

export default async function AgentChatPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const agent = await getAgentById(id);

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
