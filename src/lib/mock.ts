export interface Agent {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  tags?: string[];
}

export const agents: Agent[] = [
  {
    id: "1",
    name: "Arbitrum Stylus",
    description: "AI agent for Arbitrum",
    avatar: "/images/arbitrum",
    tags: ["arbitrum", "docs"],
  },
  {
    id: "2",
    name: "Nethermind",
    description: "AI agent for Nethermind",
    avatar: "/images/nethermind",
    tags: ["nethermind", "docs"],
  },
];
