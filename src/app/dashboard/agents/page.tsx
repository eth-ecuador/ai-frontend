import AgentCard from "@/components/agents/agent-card";
import { agents } from "@/lib/mock";
import React from "react";

export default function Dashboard() {
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
