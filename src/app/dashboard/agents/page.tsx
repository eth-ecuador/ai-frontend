import AgentCard from "@/components/agents/agent-card";
import { getAgents } from "@/services/agents";
import React from "react";

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const agents = await getAgents();

  if(!agents) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div>No agents found</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <AgentCard key={`dashboard-${agent.id}`} agent={agent} />
        ))}
      </div>
    </div>
  );
}
