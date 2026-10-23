
"use client";

import { useEffect, useRef } from "react";
import { Message } from "../types/chat";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { Bot } from "lucide-react";

type ChatWindowProps = {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
};

export default function ChatWindow({
  messages,
  onSendMessage,
  isLoading = false,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <section className="flex h-full min-w-0 flex-1 flex-col bg-white">
      {/* Chat header */}
      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-gray-200 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
          <Bot size={22} />
        </div>

        <div>
          <h1 className="font-semibold text-gray-900">
            AI Customer Support
          </h1>
          <p className="text-xs text-green-600">
            Support assistant
          </p>
        </div>
      </header>

      {/* Message area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        {messages.length === 0 ? (
          <div className="flex min-h-full flex-col items-center justify-center px-4 py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <Bot size={32} />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900">
              How can we help you?
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Choose a question below or type your own message to get started.
            </p>

            {/* Suggested questions */}
            <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "How do I reset my password?",
                "How can I contact customer support?",
                "Where can I check my order status?",
                "How do I request a refund?",
              ].map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => onSendMessage(question)}
                  disabled={isLoading}
                  className="rounded-xl border border-gray-200 bg-white p-4 text-left text-sm text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {/* Animated typing indicator */}
            {isLoading && (
              <div
                role="status"
                aria-label="Assistant is responding"
                className="flex items-center gap-3 self-start"
              >
                <div className="flex items-center gap-1 rounded-2xl bg-gray-100 px-4 py-3">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>

                <span className="text-xs text-gray-500">
                  AI is responding...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message input */}
      <footer className="shrink-0 border-t border-gray-100 px-4 py-4 sm:px-8">
        <ChatInput onSend={onSendMessage} disabled={isLoading} />

        <p className="mt-2 text-center text-xs text-gray-400">
          AI responses can be inaccurate. Avoid sharing passwords or sensitive information.
        </p>
      </footer>
    </section>
  );
}
