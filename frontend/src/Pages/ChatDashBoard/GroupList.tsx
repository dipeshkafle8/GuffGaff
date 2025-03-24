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
import { X } from "lucide-react";
import { ClipLoader } from "react-spinners";

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

  //to select the users for creating groups
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState<Boolean>(false);

  //to select users to make group
  const [selectedUsers, setSelectedUsers] = useState<UserDetails[]>([]);
  const [chatName, setChatName] = useState("");

  //to close and open dialog
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  //for quering user names
  const [query, setQuery] = useState<String>("");

  //to see drop down only when clicks on input
  const [isUserListVisible, setIsUserListVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchChats = async () => {
      setIsChatsLoading(true);
      try {
        const res = await axiosWithCookie.get("/chat/getGroupChats");
        setGroupChats(res.data.chats);
      } catch (err) {
        console.log("Error while fetching group chats", err);
      } finally {
        //  setIsChatsLoading(false);
      }
    };
    fetchChats();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsUsersLoading(true);
      try {
        let res = await axiosWithCookie.post("/user/getFilteredUsers", {
          query: query,
        });
        setUsers(res.data.users);
      } catch (err) {
        console.log("Error in getting users");
      } finally {
        setIsUsersLoading(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      fetchUsers();
    }, 800);

    // Cleanup the timer on dependency change or unmount
    //run each time before executing the useEffectcode
    return () => clearTimeout(debounceTimer);
  }, [query]);

  //to handle selectedusers
  const handleSelectUser = async (user: UserDetails) => {
    setSelectedUsers((prev) => {
      if (prev?.find((u) => u._id === user._id)) {
        return prev;
      } else {
        return [...prev, user];
      }
    });
    setIsUserListVisible(false);
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
      setSelectedUsers([]);
      setChatName("");
      setQuery("");
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

  // for setting up the query users
  const handleOnQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() == "") {
      setUsers([]);
    }
    setQuery(e.target.value);
  };

  //for handling remove user
  const handleRemoveUser = (id: String) => {
    const newSelectedUsers = selectedUsers.filter((user: UserDetails) => {
      return id != user._id;
    });
    setSelectedUsers(newSelectedUsers);
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
            // onClick={handleGetAllUsers}
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
                placeholder="Enter group name"
              />
            </div>
            <div className="relative grid grid-cols-4 items-center gap-4">
              <Label htmlFor="search-user" className="text-right">
                Select User:
              </Label>
              <Input
                type="text"
                id="search_user"
                value={query as string}
                onChange={handleOnQueryChange}
                onFocus={() => setIsUserListVisible(true)}
                onBlur={(e) => {
                  // Check if the focus is still inside the dropdown or input
                  if (
                    !e.relatedTarget ||
                    !e.relatedTarget.closest(".user-dropdown")
                  ) {
                    setIsUserListVisible(false);
                  }
                }}
                placeholder="Enter user name..."
                className="col-span-3"
              />
              {isUserListVisible && !isUsersLoading ? (
                <div
                  className="absolute bg-[#e7e3e3] top-10 border-2 w-40 flex flex-col left-32 rounded-md user-dropdown"
                  tabIndex={-1} // To ensure the dropdown can receive focus
                >
                  {users.map((user) => (
                    <div
                      key={user._id as string}
                      className="flex cursor-pointer hover:bg-[#c9c6c6] py-3 px-2"
                      onClick={() => handleSelectUser(user)} // Changed to onClick
                      tabIndex={0} // To make it keyboard navigable
                    >
                      <Avatar className="h-6 w-6 mr-2">
                        <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center text-sm font-medium">
                          {user.username[0].toUpperCase()}
                        </div>
                      </Avatar>
                      <span>{user.username}</span>
                    </div>
                  ))}
                </div>
              ) : isUserListVisible ? (
                <div
                  className="absolute bg-[#e7e3e3] top-10 border-2 w-40 flex  left-32 rounded-md user-dropdown justify-center"
                  tabIndex={-1} // To ensure the dropdown can receive focus
                >
                  <ClipLoader size={25} className="inline-block" />
                </div>
              ) : null}
            </div>
            <div className="flex flex-col">
              <div>
                <span className="text-lg">Selected Users:</span>
              </div>
              <div className="flex justify-evenly flex-wrap w-[40%]">
                {selectedUsers.map((user: UserDetails) => {
                  return (
                    <div
                      key={user._id as string}
                      className="bg-[#f530d8] text-md py-0.5 px-2 rounded-sm text-white flex items-center cursor-pointer"
                    >
                      <span className="mr-2">{user.username}</span>
                      {/* Cross Button */}
                      <button
                        className="text-white hover:text-gray-200 ml-1 cursor-pointer"
                        onClick={() => handleRemoveUser(user._id)} // Function to remove the user
                      >
                        <X size={16} className="text-white" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleOnCreateGroup} className="cursor-pointer">
                Create Group
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
