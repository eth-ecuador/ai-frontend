"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Code, Dumbbell, Copy, Check, MessageCircleMore } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Agent } from "@/lib/mock";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { getEmbeddedAgentChatCode } from "@/lib/utils";
import Link from "next/link";

export default function AgentCard({ agent }: { agent: Agent }) {
  const { id, name, description, avatar } = agent;
  const [showEmbedCode, setShowEmbedCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const embedCode = getEmbeddedAgentChatCode(id);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-96 shadow-lg relative hover:shadow-xl transition-shadow duration-300">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                onClick={() => setShowEmbedCode(true)}
              >
                <Code className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View embed code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <CardHeader className="flex flex-row items-center pb-4 gap-6">
          <Avatar className="w-24 h-24 border-4 border-primary shadow-lg">
            <AvatarImage src={avatar} alt="Agent Smith" />
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
        </CardHeader>

        <CardFooter className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 flex items-center gap-2 hover:bg-primary/5"
            asChild
          >
             <Link href={`/dashboard/agents/${id}/train`}>
              <Dumbbell className="h-4 w-4" />
              Train
            </Link>
          </Button>
          <Button className="flex-1 flex items-center gap-2" asChild>
            <Link href={`/dashboard/agents/${id}/chat`}>
              <MessageCircleMore className="h-4 w-4" />
              Chat
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showEmbedCode} onOpenChange={setShowEmbedCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Embed Code</DialogTitle>
            <DialogDescription>
              Copy this code to embed the chatbot on your website.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-slate-100 p-4 rounded-md overflow-x-auto">
            <SyntaxHighlighter language="javascript" style={docco}>
              {embedCode}
            </SyntaxHighlighter>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
