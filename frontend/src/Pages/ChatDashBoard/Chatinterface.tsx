import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "@/hooks/Usemediaquery";
import { Send, Menu, X, Phone, Video, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import ChatMessage from "./Chatmessage";
import ChatSidebar from "./Chatsidebar";
import { axiosWithCookie } from "@/lib/axios";

export interface UserDetails {
  _id: String;
  username: String;
  email: String;
  profilePic: String;
  isOnline: Boolean;
}

interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  chat: string;
  messageType: string;
  content: string;
  isDelivered: boolean;
  readBy: string[];
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<IMessage | []>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // whenever user clicks on the user on sidebar fetch messages between me an him
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosWithCookie.get(
          `message/getMessages/${selectedUser?._id}`
        );
        setMessages(res.data.messages);
      } catch (err) {
        console.log("Error in fetching messages", err);
      }
    };
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      content: newMessage,
      sender: "me",
      timestamp: new Date(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
      {/* Sidebar - hidden on mobile unless toggled */}
      <div
        className={`${
          showSidebar || isDesktop ? "flex" : "hidden"
        } w-full md:w-80 flex-col border-r border-gray-700 bg-gray-900/50 backdrop-blur-sm transition-all duration-200 ease-in-out`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4 text-white">
          <h2 className="text-xl font-semibold">Messages</h2>
          {!isDesktop && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        <ChatSidebar setSelectedUser={setSelectedUser} />
      </div>

      {/* Main chat area */}
      <div className="flex flex-1 flex-col">
        {/* Chat header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4 text-white">
          <div className="flex items-center gap-3">
            {!isDesktop && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <Avatar className="h-8 w-8">
              <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center text-sm font-medium">
                AJ
              </div>
            </Avatar>
            <div>
              <h3 className="font-medium">Alex Johnson</h3>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages area */}
        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message input */}
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 border-t border-gray-700 bg-gray-900/30 p-4"
        >
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 text-white md:text-lg"
          />
          <Button type="submit" size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
