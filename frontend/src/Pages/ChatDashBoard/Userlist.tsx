import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const USERS = [
  {
    id: 1,
    name: "Alex Johnson",
    status: "online",
    lastSeen: null,
    avatar: "AJ",
    unreadCount: 2,
  },
  {
    id: 2,
    name: "Sarah Williams",
    status: "online",
    lastSeen: null,
    avatar: "SW",
    unreadCount: 0,
  },
  {
    id: 3,
    name: "Michael Brown",
    status: "offline",
    lastSeen: "2h ago",
    avatar: "MB",
    unreadCount: 0,
  },
  {
    id: 4,
    name: "Emily Davis",
    status: "online",
    lastSeen: null,
    avatar: "ED",
    unreadCount: 5,
  },
  {
    id: 5,
    name: "David Wilson",
    status: "offline",
    lastSeen: "1d ago",
    avatar: "DW",
    unreadCount: 0,
  },
  {
    id: 6,
    name: "Jessica Taylor",
    status: "offline",
    lastSeen: "3h ago",
    avatar: "JT",
    unreadCount: 0,
  },
  {
    id: 7,
    name: "Ryan Martinez",
    status: "online",
    lastSeen: null,
    avatar: "RM",
    unreadCount: 1,
  },
];

export default function UserList() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative p-3">
        <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search contacts..."
          className="pl-9 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {USERS.map((user) => (
            <div
              key={user.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-gray-800/50 text-white"
            >
              <Avatar className="h-10 w-10">
                <div
                  className={`flex h-full w-full items-center justify-center text-sm font-medium ${
                    user.status === "online"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  {user.avatar}
                </div>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{user.name}</h4>
                  {user.unreadCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {user.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  {user.status === "online" ? "Online" : user.lastSeen}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
