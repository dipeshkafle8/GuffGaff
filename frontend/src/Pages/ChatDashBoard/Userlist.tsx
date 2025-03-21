import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosWithCookie } from "@/lib/axios";
import { toast } from "react-toastify";
import { RingLoader } from "react-spinners";
import { UserDetails } from "./Chatinterface";

interface UserListProps {
  setSelectedUser: (user: UserDetails | null) => void;
}

export default function UserList({ setSelectedUser }: UserListProps) {
  //to store all the registered users
  const [Users, setUsers] = useState<UserDetails[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axiosWithCookie.get("/message/users");
        console.log(response.data.allUsers);
        setUsers(response.data.allUsers);
      } catch (err) {
        console.log("Error in getting Users", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  //to handle clicking on a specific user
  const handleOnClickOnUser = (user: UserDetails) => {
    setSelectedUser(user);
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
          {Users.map((user, ind) => (
            <div
              key={ind}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-800/50 text-white"
              onClick={() => handleOnClickOnUser(user)}
            >
              <Avatar className="h-10 w-10">
                <div
                  className={`flex h-full w-full items-center justify-center text-sm font-medium ${
                    user.isOnline === true
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  {user.username.split("")[0].toUpperCase()}
                </div>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{user.username}</h4>
                </div>
                <p className="text-xs text-gray-400">
                  {user.isOnline === true ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
