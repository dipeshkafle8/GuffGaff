import { format } from "date-fns";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AuthContextType, useAuth } from "@/context/AuthContext";
import { UserDetails } from "./Chatinterface";
import { Message } from "./Chatinterface";
interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { user, setUser }: AuthContextType = useAuth();
  const isMe = message.sender._id === user?.id;

  return (
    <div className={cn("flex gap-2", isMe ? "flex-row-reverse" : "flex-row")}>
      {!isMe && (
        <div>
          <Avatar className="h-8 w-8 mt-1">
            <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center text-sm font-medium">
              {message.sender.username}
            </div>
          </Avatar>
        </div>
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
          {format(message.createdAt, "h:mm a")}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
