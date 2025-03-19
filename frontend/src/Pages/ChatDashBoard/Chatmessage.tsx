import { format } from "date-fns";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  content: string;
  sender: string;
  senderName?: string;
  timestamp: Date;
}
interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isMe = message.sender === "me";

  return (
    <div className={cn("flex gap-2", isMe ? "flex-row-reverse" : "flex-row")}>
      {!isMe && (
        <Avatar className="h-8 w-8 mt-1">
          <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center text-sm font-medium">
            {message.senderName
              ?.split(" ")
              .map((name) => name[0])
              .join("") || "U"}
          </div>
        </Avatar>
      )}

      <div className="flex max-w-[75%] flex-col">
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
        <span className="mt-1 text-xs text-gray-400">
          {format(message.timestamp, "h:mm a")}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
