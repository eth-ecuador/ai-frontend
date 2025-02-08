import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEmbeddedAgentChatCode(agentId: string) {
  return `<iframe 
  src="${process.env.NEXT_PUBLIC_URL}/agents/${agentId}/chat/" 
  width="100%" 
  height="500px"
/>`;
}
