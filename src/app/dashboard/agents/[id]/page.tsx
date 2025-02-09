import AgentCard from "@/components/agents/agent-card";
import { getAgentById } from "@/services/agents";
import React from "react";

export default async function AgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const agent = await getAgentById(id);

  if (!agent) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div>Agent not found</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <AgentCard agent={agent} />
    </div>
  );
}
