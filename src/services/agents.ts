import { Agent, agents } from "@/lib/mock";

export const getAgentById = (agentId: string): Agent | undefined => {
  return agents.find((agent) => agent.id === agentId);
};
