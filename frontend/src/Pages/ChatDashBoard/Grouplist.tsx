import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChatDetails, UserDetails } from "./Chatinterface";
import { ChangeEvent, useEffect, useState } from "react";
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

import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
// Sample groups data
const GROUPS = [
  {
    id: 1,
    name: "Project Alpha Team",
    members: 8,
    lastMessage: "Meeting at 3pm tomorrow",
    lastActivity: "10m ago",
    unreadCount: 3,
  },
  {
    id: 2,
    name: "Design Team",
    members: 5,
    lastMessage: "Check out the new mockups",
    lastActivity: "1h ago",
    unreadCount: 0,
  },
  {
    id: 3,
    name: "Marketing Strategy",
    members: 12,
    lastMessage: "Campaign results are in!",
    lastActivity: "3h ago",
    unreadCount: 7,
  },
  {
    id: 4,
    name: "Weekend Hangout",
    members: 6,
    lastMessage: "Who's free this Saturday?",
    lastActivity: "1d ago",
    unreadCount: 0,
  },
  {
    id: 5,
    name: "Tech Support",
    members: 15,
    lastMessage: "Server maintenance scheduled",
    lastActivity: "2d ago",
    unreadCount: 0,
  },
];
interface GroupListProps {
  setSelectedChat: (chat: ChatDetails | null) => void;
}

export default function GroupList({ setSelectedChat: GroupListProps }) {
  //to fetch groupChats from backend
  const [groupChats, setGroupChats] = useState<ChatDetails | null>(null);
  const [isChatsLoading, setIsChatsLoading] = useState<Boolean>(false);

  //to select the users for creating groups
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState<Boolean>(false);

  const [selectedUsers, setSelectedUsers] = useState<UserDetails[]>([]);
  const [chatName, setChatName] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      setIsChatsLoading(true);
      try {
        const res = await axiosWithCookie.get("/chat/getGroupChats");
        console.log(res);
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
        chatName: chatName,
        users: JSON.stringify(selectedUsers),
      };
      let res = await axiosWithCookie.post("/chat/createGroup", data);
      console.log(res.data);
      setGroupChats(res.data.group);
    } catch (err) {
      console.log("Error in creating group");
    }
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
          {GROUPS.map((group) => (
            <div
              key={group.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-800/50 text-white"
            >
              <Avatar className="h-10 w-10">
                <div className="bg-violet-700 text-white flex h-full w-full items-center justify-center text-sm font-medium">
                  <Users className="h-5 w-5" />
                </div>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h4 className="font-medium">{group.name}</h4>
                    <Badge
                      variant="outline"
                      className="ml-2 text-xs py-0 h-5 border-gray-700 text-gray-400"
                    >
                      {group.members}
                    </Badge>
                  </div>
                  {group.unreadCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {group.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 truncate max-w-[180px]">
                  {group.lastMessage}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {group.lastActivity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      {/* create group logic */}
      <Dialog>
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
            <Command className="rounded-lg border shadow-md md:min-w-[40%]">
              <CommandInput placeholder="Search users..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Users">
                  {users.map((user) => (
                    <CommandItem
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
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>

            <div className="flex flex-col">
              <div>
                <span className="text-lg">Selected Users:</span>
              </div>
              <div className="flex justify-evenly flex-wrap  w-[40%]">
                {selectedUsers.map((user: UserDetails) => {
                  return (
                    <span className="bg-[#f530d8] text-md py-0.5 px-2 rounded-sm text-white cursor-pointer">
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
