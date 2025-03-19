import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

export default function GroupList() {
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
    </div>
  );
}
