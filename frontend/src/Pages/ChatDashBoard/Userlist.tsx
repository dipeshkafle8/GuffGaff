import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosWithCookie } from "@/lib/axios";
import { toast } from "react-toastify";
import { RingLoader } from "react-spinners";
import { ChatDetails, UserDetails } from "./Chatinterface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Description } from "@radix-ui/react-dialog";
import { AuthContextType, useAuth } from "@/context/AuthContext";

interface UserListProps {
  setSelectedChat: (chat: ChatDetails | null) => void;
}

export default function UserList({ setSelectedChat }: UserListProps) {
  //to store all the registered users
  const [chats, setChats] = useState<ChatDetails[]>([]);
  const { user, setUser }: AuthContextType = useAuth();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axiosWithCookie.get("/chat/getSingleChats");
        setChats(response.data.chats);
      } catch (err) {
        console.log("Error in getting Users", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  //to handle clicking on a specific user
  const handleOnClickOnUser = (chat: ChatDetails) => {
    setSelectedChat(chat);
  };

  //handle getting users for creating chat
  const handleGetAllUsers = async () => {
    setIsUsersLoading(true);
    try {
      const res = await axiosWithCookie.get("/user/getAllUsers");

      setUsers(res.data.Users);
    } catch (err) {
      console.log("Error in getting users");
    } finally {
      setIsUsersLoading(false);
    }
  };

  const handleCreateChat = async (user: UserDetails) => {
    try {
      const res = await axiosWithCookie.get("/chat/getAllChats", {
        params: {
          userId: user._id,
        },
      });
      console.log(res);
    } catch (err) {
      console.log("Error in creating chat");
    }
  };

  //to find the staring letter of the another user
  const findStartingLetter = (chat: ChatDetails) => {
    let secondUser = chat.users.filter((u) => u._id != user?.id);
    if (secondUser.length > 0) {
      return secondUser[0].username.split("")[0].toUpperCase();
    }
    return "no User";
  };

  //to find the username
  const findUsername = (chat: ChatDetails) => {
    let secondUser = chat.users.filter((u) => u._id != user?.id);
    if (secondUser.length > 0) {
      return secondUser[0].username;
    }
    return "User not found";
  };

  //if currenlty fetching user details
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80%]">
        <RingLoader color="white" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative p-3">
        <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search user"
          className="pl-9 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {chats.map((chat, ind) => (
            <div
              key={ind}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-800/50 text-white"
              onClick={() => handleOnClickOnUser(chat)}
            >
              <Avatar className="h-10 w-10">
                <div className="flex h-full w-full items-center justify-center text-sm font-medium ">
                  {findStartingLetter(chat)}
                </div>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{findUsername(chat)}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg-[#4242f2] cursor-pointer hover:bg-[#4242f2bb] w-[50%] text-center ml-3"
            onClick={handleGetAllUsers}
          >
            New message +
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Select Users</DialogTitle>
          <Description></Description>
          <div className="flex flex-col gap-y-2">
            {isUsersLoading ? (
              <span>Loading....</span>
            ) : (
              users.map((user) => {
                return (
                  <div
                    key={user._id.toString()}
                    className="user-item bg-[#ccc7c7] p-2 rounded-md cursor-pointer hover:bg-[#b0acac] hover:text-white"
                    onClick={() => handleCreateChat(user)}
                  >
                    {user.username}
                  </div>
                );
              })
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
