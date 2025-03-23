import { format } from "date-fns";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AuthContextType, useAuth } from "@/context/AuthContext";
import { Message } from "./ChatInterface";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { user }: AuthContextType = useAuth();
  const isMe = message.sender._id === user?.id;

  return (
    <div className={cn("flex gap-2", isMe ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar */}
      {!isMe && (
        <div>
          <Avatar className="h-8 w-8 mt-1">
            {message.sender.pic ? (
              <img
                src={message.sender.pic as string}
                alt={(message.sender.username as string) || "User"}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center text-sm font-medium">
                {message.sender.username?.[0]?.toUpperCase() || "U"}
              </div>
            )}
          </Avatar>
        </div>
      )}

      {/* Message Content */}
      <div className="flex max-w-[75%] flex-col">
        {/* Username (if not me) */}
        {!isMe && (
          <span className="text-md text-gray-200 mb-1">
            {message.sender.username}
          </span>
        )}

        {/* Message Bubble */}
        <div
          className={cn(
            "rounded-lg px-4 py-2",
            isMe
              ? "bg-primary text-primary-foreground"
              : "bg-gray-800 text-gray-100"
          )}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>

        {/* Timestamp */}
        <span className="mt-1 text-xs text-gray-400">
          {format(new Date(message.createdAt), "h:mm a")}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
