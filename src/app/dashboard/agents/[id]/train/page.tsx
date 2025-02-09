import { AddSourceCard } from "@/components/add-source-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getAgentById } from "@/services/agents";
import { getSourcesByAgentId } from "@/services/sources";
import React from "react";

export default async function AgentPage({
  params,
}: {
    params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const agent = await getAgentById(id);

  const { name, description, image_url } = agent;

  const sources = await getSourcesByAgentId(id);

  if(!agent) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div>Agent not found</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-start p-8">
      <div className="w-full flex justify-start">
        <div className="flex flex-row items-center pb-4 gap-6">
          <Avatar className="w-24 h-24 border-4 border-primary shadow-lg">
            <AvatarImage
              src={image_url || "/images/placeholder.png"}
              alt="Agent Smith"
            />
            <AvatarFallback className="text-2xl bg-primary/10">
              AS
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-sm text-muted-foreground max-w-[250px]">
              {description}
            </p>
          </div>
        </div>
      </div>
      <AddSourceCard agentId={id} />

      <Separator className="mt-8" />

      <div>
        <h3 className="text-2xl font-semibold mt-8">Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {sources && sources.map((source) => (
            <div key={source.id} className="bg-white p-4 rounded-md shadow-md">
              <h4 className="text-xl font-semibold">{source.type}</h4>
              <p className="text-sm text-muted-foreground">
                {source.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
