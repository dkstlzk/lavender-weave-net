import { NodeStatusCard } from "@/components/dashboard/NodeStatusCard"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { PeersList } from "@/components/dashboard/PeersList"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Search, Upload, Download, Network } from "lucide-react"
import { useNodeStats, useConnectedPeers, useRecentActivity, useNetworkMetrics } from "@/hooks/useWails"
import { Skeleton } from "@/components/ui/skeleton"

export default function Dashboard() {
  const { data: nodeStats, isLoading: nodeLoading, error: nodeError } = useNodeStats()
  const { data: peers, isLoading: peersLoading } = useConnectedPeers()
  const { data: activities, isLoading: activitiesLoading } = useRecentActivity()
  const { data: networkMetrics, isLoading: metricsLoading } = useNetworkMetrics()

  // Handle loading states
  if (nodeLoading || peersLoading || activitiesLoading || metricsLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    )
  }

  // Handle error states
  if (nodeError) {
    return (
      <div className="space-y-6 animate-fade-in">
        <Card className="bg-gradient-card border-destructive/50 shadow-card">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-destructive mb-2">Connection Error</h2>
              <p className="text-muted-foreground">
                Failed to connect to FileNest backend. Please ensure the Wails application is running.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to FileNest
          </h1>
          <p className="text-muted-foreground">
            Manage your distributed file sharing network
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button className="bg-gradient-primary shadow-primary hover:shadow-glow transition-all">
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
          <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
            <Search className="h-4 w-4 mr-2" />
            Search Network
          </Button>
        </div>
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <Network className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{nodeStats?.connectedPeers || 0}</p>
                <p className="text-sm text-muted-foreground">Active Peers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-file-shared/10">
                <Upload className="h-6 w-6 text-file-shared" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{nodeStats?.sharedFiles || 0}</p>
                <p className="text-sm text-muted-foreground">Files Shared</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{networkMetrics?.messagesReceived ? Math.round(networkMetrics.messagesReceived / 1024) : 2.4} GB</p>
                <p className="text-sm text-muted-foreground">Downloaded</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <Search className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activities?.filter(a => a.type === 'search').length || 89}</p>
                <p className="text-sm text-muted-foreground">Searches</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          {nodeStats && <NodeStatusCard stats={nodeStats} />}
        </div>
        
        <div className="lg:col-span-1">
          {activities && <RecentActivity activities={activities} />}
        </div>
        
        <div className="lg:col-span-1">
          {peers && <PeersList peers={peers} />}
        </div>
      </div>

      {/* Network Health */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Network Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Connection Quality</span>
              <span className="text-success font-medium">
                {nodeStats?.networkLatency && nodeStats.networkLatency < 50 ? 'Excellent' : 
                 nodeStats?.networkLatency && nodeStats.networkLatency < 100 ? 'Good' : 'Average'}
              </span>
            </div>
            <Progress value={nodeStats?.networkLatency ? Math.max(10, 100 - nodeStats.networkLatency) : 92} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">DHT Coverage</span>
              <span className="text-file-shared font-medium">
                {networkMetrics?.bucketUtilization ? `${networkMetrics.bucketUtilization}%` : 'Good'}
              </span>
            </div>
            <Progress value={networkMetrics?.bucketUtilization || 78} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Search Accuracy</span>
              <span className="text-primary font-medium">Very Good</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}