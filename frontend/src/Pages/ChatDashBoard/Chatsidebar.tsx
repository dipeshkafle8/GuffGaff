import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  LogOut,
  Settings,
  User,
  Users,
  ChevronDown,
  ChevronUp,
  Bell,
} from "lucide-react";
import UserList from "./Userlist";
import GroupList from "./Grouplist";
import { axiosWithCookie } from "@/lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContextType, useAuth } from "@/context/AuthContext";
import { ChatDetails, UserDetails } from "./Chatinterface";

interface ChatSideBarProps {
  selectedChat: ChatDetails | null;
  setSelectedChat: (chat: ChatDetails | null) => void;
}

const ChatSidebar: React.FC<ChatSideBarProps> = ({
  selectedChat,
  setSelectedChat,
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const { user, setUser }: AuthContextType = useAuth();
  const navigate = useNavigate();

  //for handling logout
  const handleLogOut = async () => {
    try {
      const res = await axiosWithCookie.post("/user/logout");
      if (res.data.status) {
        toast.success("Successfully Logged Out!!", {
          position: "top-right",
          autoClose: 500,
        });
        setUser(null);
        navigate("/");
      }
    } catch (err) {
      toast.error("Error in logging out", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tabs for Contacts and Groups */}
      <Tabs defaultValue="contacts" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-2 mx-4 mt-2 bg-gray-800/50">
          <TabsTrigger
            value="contacts"
            className="data-[state=active]:bg-primary text-white hover:cursor-pointer"
          >
            <User className="h-4 w-4 mr-2 text-white" />
            Messages
          </TabsTrigger>
          <TabsTrigger
            value="groups"
            className="data-[state=active]:bg-primary text-white hover:cursor-pointer"
          >
            <Users className="h-4 w-4 mr-2 text-white" />
            Groups
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="flex-1 mt-0">
          <UserList
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </TabsContent>

        <TabsContent value="groups" className="flex-1 mt-0">
          <GroupList
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        </TabsContent>
      </Tabs>

      {/* Profile Section */}
      <div className="border-t border-gray-700 mt-auto">
        <div className="p-3">
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center text-white hover:cursor-pointer hover:bg-white "
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <div className="bg-violet-600  text-white flex h-full w-full items-center justify-center text-sm font-medium">
                  ME
                </div>
              </Avatar>
              <div className="text-left ">
                <p className="font-medium">{user?.username}</p>
                <p className="text-xs">{user?.email}</p>
              </div>
            </div>
            {showProfile ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>

        {/* Expanded Profile Options */}
        {showProfile && (
          <div className="px-3 pb-3 space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:cursor-pointer"
            >
              <User className="h-4 w-4 mr-2" />
              My Profile
            </Button>

            <Button
              variant="destructive"
              className="w-full justify-start mt-2 hover:cursor-pointer"
              onClick={handleLogOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
