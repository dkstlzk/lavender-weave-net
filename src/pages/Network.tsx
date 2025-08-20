import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, Network as NetworkIcon, Database, MessageSquare, Router, Zap } from "lucide-react"

// Mock network data
const networkStats = {
  dhtSize: 15420,
  bucketUtilization: 78,
  messagesSent: 8924,
  messagesReceived: 12356,
  routingTableSize: 245,
  activeConnections: 12
}

const networkEvents = [
  { id: '1', type: 'peer_join', message: 'Peer 12D3...4GhI joined the network', timestamp: '2 min ago', severity: 'info' },
  { id: '2', type: 'file_share', message: 'New file shared: machine-learning.pdf', timestamp: '5 min ago', severity: 'success' },
  { id: '3', type: 'search', message: 'Embedding search completed with 23 results', timestamp: '8 min ago', severity: 'info' },
  { id: '4', type: 'peer_leave', message: 'Peer 12D3...2hI disconnected', timestamp: '12 min ago', severity: 'warning' },
  { id: '5', type: 'error', message: 'Failed to connect to peer /ip4/203.0.113.50/tcp/4001', timestamp: '15 min ago', severity: 'error' },
]

export default function NetworkPage() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'text-success border-success/30'
      case 'warning':
        return 'text-warning border-warning/30'
      case 'error':
        return 'text-destructive border-destructive/30'
      default:
        return 'text-primary border-primary/30'
    }
  }

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case 'peer_join':
      case 'peer_leave':
        return <NetworkIcon className="h-4 w-4" />
      case 'file_share':
        return <Database className="h-4 w-4" />
      case 'search':
        return <Activity className="h-4 w-4" />
      case 'error':
        return <Zap className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Network Analytics</h1>
            <p className="text-muted-foreground">Monitor network health and performance metrics</p>
          </div>
        </div>

        {/* Network Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-lg font-bold text-foreground">{networkStats.dhtSize.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">DHT Entries</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Router className="h-5 w-5 text-file-shared" />
                <div>
                  <p className="text-lg font-bold text-foreground">{networkStats.routingTableSize}</p>
                  <p className="text-xs text-muted-foreground">Routing Table</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <NetworkIcon className="h-5 w-5 text-success" />
                <div>
                  <p className="text-lg font-bold text-foreground">{networkStats.activeConnections}</p>
                  <p className="text-xs text-muted-foreground">Connections</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-lg font-bold text-foreground">{networkStats.messagesSent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-peer-active" />
                <div>
                  <p className="text-lg font-bold text-foreground">{networkStats.messagesReceived.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Received</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-lg font-bold text-foreground">{networkStats.bucketUtilization}%</p>
                  <p className="text-xs text-muted-foreground">Utilization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Network Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">Network Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">DHT Coverage</span>
                  <span className="text-success font-medium">Excellent (92%)</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bucket Utilization</span>
                  <span className="text-file-shared font-medium">Good (78%)</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Connection Stability</span>
                  <span className="text-primary font-medium">Very Good (85%)</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Message Throughput</span>
                  <span className="text-warning font-medium">Average (67%)</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">Routing Table Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-foreground">Bucket {i}</div>
                      <Badge variant="outline" className="text-xs">
                        {Math.floor(Math.random() * 20) + 5} peers
                      </Badge>
                    </div>
                    <Progress value={Math.floor(Math.random() * 40) + 60} className="w-24 h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Network Events */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Network Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-3">
                {networkEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg bg-muted/50 ${getSeverityColor(event.severity)}`}>
                      {getSeverityIcon(event.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{event.message}</p>
                      <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getSeverityColor(event.severity)}`}
                    >
                      {event.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}