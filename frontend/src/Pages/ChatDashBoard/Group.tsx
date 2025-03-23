import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";

import { ChatDetails, UserDetails } from "./ChatInterface";
import { useEffect, useState } from "react";
import { axiosWithCookie } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

interface GroupListProps {
  selectedChat: ChatDetails | null;
  setSelectedChat: (chat: ChatDetails | null) => void;
}

export default function GroupList({
  selectedChat,
  setSelectedChat,
}: GroupListProps) {
  //to fetch groupChats from backend
  const [groupChats, setGroupChats] = useState<ChatDetails[]>([]);
  const [isChatsLoading, setIsChatsLoading] = useState<Boolean>(false);
  console.log(isChatsLoading);
  //to select the users for creating groups
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState<Boolean>(false);
  console.log(isUsersLoading);
  //to select users to make group
  const [selectedUsers, setSelectedUsers] = useState<UserDetails[]>([]);
  const [chatName, setChatName] = useState("");

  //to close and open dialog
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchChats = async () => {
      setIsChatsLoading(true);
      try {
        const res = await axiosWithCookie.get("/chat/getGroupChats");
        setGroupChats(res.data.chats);
      } catch (err) {
        console.log("Error while fetching group chats", err);
      } finally {
        setIsChatsLoading(false);
      }
    };
    fetchChats();
  }, []);

  //to get all users
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

  //to handle selectedusers
  const handleSelectUser = async (user: UserDetails) => {
    setSelectedUsers((prev) => {
      if (prev?.find((u) => u._id === user._id)) {
        return prev.filter((u) => u._id !== user._id);
      } else {
        return [...prev, user];
      }
    });
  };

  //handle on input change
  const handleChatNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(e.target.value);
  };

  //handle on createGroup
  const handleOnCreateGroup = async () => {
    try {
      if (chatName.trim() == "") {
        alert("Please provide valid name");
      }
      if (selectedUsers.length == 0) {
        alert("Please select at least one user");
      }
      let data = {
        name: chatName,
        users: JSON.stringify(selectedUsers),
      };
      let res = await axiosWithCookie.post("/chat/createGroup", data);

      setGroupChats([...groupChats, res.data.group]);

      //to display successfull message
      toast.success("Group Created Successfully", {
        autoClose: 800,
        position: "top-center",
      });

      setIsDialogOpen(false);
    } catch (err) {
      toast.error("Error in creating group");
      console.log("Error in creating group");
    }
  };

  //for handling on clicking chat
  const handleOnChatSelect = (chat: ChatDetails) => {
    setSelectedChat(chat);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative p-3">
        <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search groups..."
          className="pl-9 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {groupChats.map((group) => {
            return (
              <div
                key={group._id as string}
                className={`flex cursor-pointer hover:bg-emerald-600 items-center gap-3 rounded-lg p-2  text-white ${
                  selectedChat?._id === group._id ? "bg-emerald-600" : ""
                }`}
                onClick={() => handleOnChatSelect(group)}
              >
                <Avatar className="h-10 w-10">
                  <div className="bg-violet-700 text-white flex h-full w-full items-center justify-center text-sm font-medium">
                    <Users className="h-5 w-5" />
                  </div>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h4 className="font-medium text-white">
                        {group.chatName}
                      </h4>
                    </div>
                  </div>
                  {/* <p className="text-xs text-gray-400 truncate max-w-[180px]">
                  {group.latestMessage?}
                </p> */}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      {/* create group logic */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-[#4242f2] cursor-pointer hover:bg-[#4242f2bb] w-[50%] text-center ml-3"
            onClick={handleGetAllUsers}
          >
            + Create group
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[30%]">
          <DialogHeader>
            <DialogTitle>Create group</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Group Name :
              </Label>
              <Input
                type="text"
                id="name"
                value={chatName}
                onChange={handleChatNameChange}
                className="col-span-3"
              />
            </div>

            {users.map((user) => (
              <div
                key={user._id as string}
                className="cursor-pointer"
                onSelect={() => handleSelectUser(user)}
              >
                <Avatar className="h-6 w-6 mr-2">
                  <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center text-sm font-medium">
                    {user.username[0].toUpperCase()}
                  </div>
                </Avatar>
                <span>{user.username}</span>
                {selectedUsers.find((u) => u._id === user._id) && (
                  <span className="ml-auto text-primary">Selected</span>
                )}
              </div>
            ))}

            <div className="flex flex-col">
              <div>
                <span className="text-lg">Selected Users:</span>
              </div>
              <div className="flex justify-evenly flex-wrap  w-[40%]">
                {selectedUsers.map((user: UserDetails) => {
                  return (
                    <span
                      key={user._id as string}
                      className="bg-[#f530d8] text-md py-0.5 px-2 rounded-sm text-white cursor-pointer"
                    >
                      {user.username}
                    </span>
                  );
                })}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleOnCreateGroup}>Create Group</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
