import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "@prisma/client";

interface RecentActivityProps {
  messages: Message[];
}

export function RecentActivity({ messages }: RecentActivityProps) {
  return (
    <div className="space-y-6">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{message.name?.charAt(0).toUpperCase() || '?'}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{message.name}</p>
              <p className="text-sm text-muted-foreground truncate">{message.email}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">
          Nenhuma mensagem recente.
        </p>
      )}
    </div>
  );
}