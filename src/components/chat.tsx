"use client";

import { useChat } from "ai/react";

export const Chat = () => {
  const { messages, handleInputChange, handleSubmit, input, setInput } = useChat({
    api: "http://localhost:8000/agents/stream",
    streamProtocol: "data",
  });

  return (
    <div className="flex flex-col w-full h-full bg-gray-50 shadow-lg rounded-lg max-w-[600px] mx-auto">
      <div className="flex flex-col flex-1 overflow-y-auto p-4 bg-white border-b border-gray-300 rounded-t-xl custom-scrollbar overflow-x-hidden">
        {messages.length ? (
          messages.map((message, i) => (
            <div
              className={`w-full flex flex-row gap-4 p-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
              key={i}
            >
              <div className="max-w-[80%] w-full">
                <div
                  className={`p-3 rounded-xl ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <p className="text-sm font-normal break-words">{message.content}</p>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  {message.role === "user" ? "You" : "Bot"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-zinc-500 text-sm pt-6">
            Ask your first question to get started.
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="text-black flex flex-row gap-2 p-4 bg-white border-t border-gray-300">
        <input
          aria-label="Enter your question"
          onChange={handleInputChange}
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
              setInput("");
            }
          }}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm disabled:opacity-50"
          disabled={!input}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;