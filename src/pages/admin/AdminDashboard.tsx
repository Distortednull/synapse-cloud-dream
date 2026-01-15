import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FolderKanban, FileText, MessageSquare, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export const AdminDashboard = () => {
  const { data: projectsCount = 0 } = useQuery({
    queryKey: ["admin-projects-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: blogPostsCount = 0 } = useQuery({
    queryKey: ["admin-blog-posts-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: unreadMessagesCount = 0 } = useQuery({
    queryKey: ["admin-unread-messages-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true })
        .eq("read", false);
      return count || 0;
    },
  });

  const { data: recentMessages = [] } = useQuery({
    queryKey: ["admin-recent-messages"],
    queryFn: async () => {
      const { data } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      return data || [];
    },
  });

  const stats = [
    {
      name: "Total Projects",
      value: projectsCount,
      icon: FolderKanban,
      color: "text-blue-500",
    },
    {
      name: "Blog Posts",
      value: blogPostsCount,
      icon: FileText,
      color: "text-green-500",
    },
    {
      name: "Unread Messages",
      value: unreadMessagesCount,
      icon: MessageSquare,
      color: "text-primary",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentMessages.length === 0 ? (
            <p className="text-muted-foreground text-sm">No messages yet</p>
          ) : (
            <div className="space-y-4">
              {recentMessages.map((message: any) => (
                <div
                  key={message.id}
                  className="flex items-start justify-between border-b border-border pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {message.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {message.subject}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        message.read
                          ? "bg-secondary text-muted-foreground"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {message.read ? "Read" : "New"}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(message.created_at), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
