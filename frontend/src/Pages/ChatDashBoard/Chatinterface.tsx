import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "@/hooks/Usemediaquery";
import { Send, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import ChatMessage from "./Chatmessage";
import ChatSidebar from "./Chatsidebar";
import { axiosWithCookie } from "@/lib/axios";
import { AuthContextType, useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { getSocket } from "@/socket/socketClient";

export interface UserDetails {
  _id: String;
  username: String;
  email: String;
  profilePic: String;
  isOnline: Boolean;
}

export interface Message {
  _id: number;
  content: string;
  sender: UserDetails;
  updatedAt: Date;
  createdAt: Date;
}
export interface ChatDetails {
  _id: String;
  chatName: String;
  isGroupChat: Boolean;
  users: UserDetails[];
  updatedAt: Date;
  createdAt: Date;
}

export default function ChatInterface() {
  const { user, setUser }: AuthContextType = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatDetails | null>(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState<Boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  let socket = getSocket();

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (user) socket?.emit("setup", user);
  }, []);

  useEffect(() => {
    socket?.on("message received", (newMessageReceived) => {
      if (!selectedChat || selectedChat._id != newMessageReceived.chat._id) {
        //logic for notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  // whenever user clicks on the user on sidebar fetch messages between me an him
  useEffect(() => {
    const fetchMessages = async () => {
      setIsMessagesLoading(true);
      try {
        const res = await axiosWithCookie.get(
          `message/getMessages/${selectedChat?._id}`
        );

        setMessages(res.data.messages);
        socket?.emit("join room", selectedChat?._id);
      } catch (err) {
        console.log("Error in fetching messages", err);
      } finally {
        setIsMessagesLoading(false);
      }
    };
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const getUsername = () => {
    let secondUser = selectedChat?.users.filter((u) => u._id != user?.id);

    if (secondUser) {
      return secondUser[0].username;
    }

    return "No User";
  };

  // to get the first Letter
  const getFirstLetter = () => {
    let username = getUsername();
    return username.split("")[0];
  };

  //sending message and storing in the database
  const sendMessageToUser = async (message: String) => {
    try {
      if (!selectedChat) {
        console.log("No chat is selected");
        return;
      }
      if (message.trim() == "") {
        toast.error("Please provide some message", {
          position: "top-center",
          autoClose: 800,
        });
      }
      const data = {
        chatId: selectedChat._id,
        content: message,
      };
      const res = await axiosWithCookie.post("/message/sendMessage", data);
      socket?.emit("send message", res.data.message);
      setMessages([...messages, res.data.message]);
    } catch (err) {
      console.log("Error in sending message");
    }
  };

  //to handle on clicking the close chat button

  const handleOnCloseChat = () => {
    setSelectedChat(null);
  };

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message: string = (formData.get("message") as string) ?? "";
    sendMessageToUser(message);
    e.currentTarget.reset();
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
        <ChatSidebar setSelectedChat={setSelectedChat} />
      </div>
      {selectedChat ? (
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
                  {getFirstLetter()}
                </div>
              </Avatar>
              <div>
                <h3 className="font-medium">{getUsername()}</h3>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                onClick={handleOnCloseChat}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages area */}
          <ScrollArea className="flex-1 p-4 overflow-y-auto max-h-[90%]">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <ChatMessage key={message._id} message={message} />
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
              name="message"
              className="flex-1 text-white md:text-lg"
            />
            <Button type="submit" size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[100%] text-white text-lg  w-[100%]">
          <span>No messages</span>
        </div>
      )}
    </div>
  );
}
