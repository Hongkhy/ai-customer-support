
import { Message } from "../types/chat";

type MessageBubbleProps = {
  message: Message;
};

export default function MessageBubble({
  message,
}: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "rounded-br-sm bg-blue-600 text-white"
            : "rounded-bl-sm bg-gray-100 text-gray-900"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-6">
          {message.content}
        </p>

        <p
          className={`mt-2 text-xs ${
            isUser ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {message.createdAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
