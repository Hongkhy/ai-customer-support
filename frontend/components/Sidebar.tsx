
"use client";

import {
  MessageSquare,
  Plus,
  PanelLeftClose,
  Trash2,
} from "lucide-react";
import type { Conversation } from "../types/chat";

type SidebarProps = {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-gray-50 p-4 transition-transform duration-300 md:static md:z-auto md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          AI Support
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-200"
        >
          <PanelLeftClose size={20} />
        </button>
      </div>

      <button
        type="button"
        onClick={onNewChat}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
      >
        <Plus size={18} />
        New conversation
      </button>

      <div className="mt-6 flex-1 overflow-y-auto">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Recent conversations
        </p>

        {conversations.length === 0 ? (
          <p className="text-sm text-gray-400">
            No conversations yet
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`group flex items-center gap-1 rounded-lg ${
                  activeConversationId === conversation.id
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    onSelectConversation(conversation.id);
                    onClose();
                  }}
                  className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-left text-sm text-gray-700"
                >
                  <MessageSquare size={16} className="shrink-0" />
                  <span className="truncate">
                    {conversation.title}
                  </span>
                </button>

                <button
                  type="button"
                  aria-label={`Delete conversation: ${conversation.title}`}
                  title="Delete conversation"
                  onClick={() => onDeleteConversation(conversation.id)}
                  className="mr-1 rounded-md p-2 text-gray-400 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm font-medium text-gray-700">
          Guest customer
        </p>
        <p className="text-xs text-gray-500">
          Sign in to save your chats
        </p>
      </div>
    </aside>
  );
}
