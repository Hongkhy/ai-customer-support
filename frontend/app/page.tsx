"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import type { Conversation, Message } from "../types/chat";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function Home() {
  const STORAGE_KEY = "ai-customer-support-conversations";
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId
  );

  const messages = activeConversation?.messages ?? [];

  
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedConversations = localStorage.getItem(STORAGE_KEY);

      if (savedConversations) {
        const parsed = JSON.parse(savedConversations) as Conversation[];

        setConversations(
          parsed.map((conversation) => ({
            ...conversation,
            createdAt: new Date(conversation.createdAt),
            messages: conversation.messages.map((message) => ({
              ...message,
              createdAt: new Date(message.createdAt),
            })),
          }))
        );
      }
    } catch (error) {
      console.error("Could not load saved conversations:", error);
    } finally {
      setIsStorageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isStorageLoaded) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations, isStorageLoaded]);


  function handleNewChat() {
    setActiveConversationId(null);
    setIsLoading(false);
    setIsSidebarOpen(false);
  }

  function handleSelectConversation(id: string) {
    setActiveConversationId(id);
    setIsLoading(false);
  }

  function handleDeleteConversation(id: string) {
    setConversations((previous) =>
      previous.filter((conversation) => conversation.id !== id)
    );

    if (activeConversationId === id) {
      setActiveConversationId(null);
      setIsLoading(false);
    }
  }

  function handleSendMessage(content: string) {
    let conversationId = activeConversationId;

    // Create a conversation when the first message is sent.
    if (!conversationId) {
      conversationId = crypto.randomUUID();

      const newConversation: Conversation = {
        id: conversationId,
        title:
          content.length > 35
            ? `${content.slice(0, 35).trim()}...`
            : content,
        messages: [],
        createdAt: new Date(),
      };

      setConversations((previous) => [
        newConversation,
        ...previous,
      ]);

      setActiveConversationId(conversationId);
    }

    const currentId = conversationId;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date(),
    };

    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === currentId
          ? {
              ...conversation,
              messages: [...conversation.messages, userMessage],
            }
          : conversation
      )
    );

    setIsLoading(true);

    // Temporary demo response. We'll connect the real AI API later.
    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Thanks for contacting support! This is a temporary demo response. We'll connect the real AI assistant later.",
        createdAt: new Date(),
      };

      setConversations((previous) =>
        previous.map((conversation) =>
          conversation.id === currentId
            ? {
                ...conversation,
                messages: [...conversation.messages, assistantMessage],
              }
            : conversation
        )
      );

      setIsLoading(false);
    }, 800);
  }

  return (
    <main className="flex h-screen overflow-hidden bg-white">
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar backdrop"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
        />
      )}

      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <div className="flex h-14 shrink-0 items-center border-b border-gray-200 px-3 md:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          >
            <Menu size={22} />
          </button>

          <span className="ml-2 font-semibold text-gray-900">
            AI Support
          </span>
        </div>

        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}
