import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, Download, Search, Users } from "lucide-react"

interface ActivityItem {
  id: string
  type: 'upload' | 'download' | 'search' | 'peer_connect'
  title: string
  timestamp: string
  status: 'completed' | 'in_progress' | 'failed'
}

interface RecentActivityProps {
  activities: ActivityItem[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'upload':
        return <Upload className="h-4 w-4 text-success" />
      case 'download':
        return <Download className="h-4 w-4 text-file-shared" />
      case 'search':
        return <Search className="h-4 w-4 text-primary" />
      case 'peer_connect':
        return <Users className="h-4 w-4 text-peer-active" />
    }
  }

  const getStatusColor = (status: ActivityItem['status']) => {
    switch (status) {
      case 'completed':
        return 'text-success'
      case 'in_progress':
        return 'text-warning'
      case 'failed':
        return 'text-destructive'
    }
  }

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                {getActivityIcon(activity.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
                <span className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}