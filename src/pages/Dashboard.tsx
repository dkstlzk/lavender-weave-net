import { NodeStatusCard } from "@/components/dashboard/NodeStatusCard"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { PeersList } from "@/components/dashboard/PeersList"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Search, Upload, Download, Network } from "lucide-react"

// Mock data - in real app this would come from Wails backend
const nodeStats = {
  peerId: "12D3KooWBhvxGtDzMpqrP5gC8fD9c1mVz2hJkLpQx3aBcDeF4GhI",
  status: 'online' as const,
  connectedPeers: 12,
  sharedFiles: 147,
  networkLatency: 45
}

const recentActivities = [
  { id: '1', type: 'upload' as const, title: 'document.pdf uploaded', timestamp: '2 minutes ago', status: 'completed' as const },
  { id: '2', type: 'download' as const, title: 'dataset.csv downloading', timestamp: '5 minutes ago', status: 'in_progress' as const },
  { id: '3', type: 'search' as const, title: 'Search for "machine learning"', timestamp: '10 minutes ago', status: 'completed' as const },
  { id: '4', type: 'peer_connect' as const, title: 'New peer connected', timestamp: '15 minutes ago', status: 'completed' as const },
  { id: '5', type: 'upload' as const, title: 'image.jpg upload failed', timestamp: '20 minutes ago', status: 'failed' as const }
]

const connectedPeers = [
  { id: 'peer1', address: '/ip4/192.168.1.100/tcp/4001', status: 'online' as const, latency: 25, filesShared: 34, lastSeen: '1 min ago' },
  { id: 'peer2', address: '/ip4/10.0.0.45/tcp/4001', status: 'online' as const, latency: 67, filesShared: 89, lastSeen: '3 min ago' },
  { id: 'peer3', address: '/ip4/172.16.0.12/tcp/4001', status: 'connecting' as const, latency: 120, filesShared: 12, lastSeen: '5 min ago' },
  { id: 'peer4', address: '/ip4/203.0.113.15/tcp/4001', status: 'online' as const, latency: 180, filesShared: 56, lastSeen: '2 min ago' }
]

export default function Dashboard() {
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
                <p className="text-2xl font-bold text-foreground">12</p>
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
                <p className="text-2xl font-bold text-foreground">147</p>
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
                <p className="text-2xl font-bold text-foreground">2.4 GB</p>
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
                <p className="text-2xl font-bold text-foreground">89</p>
                <p className="text-sm text-muted-foreground">Searches</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <NodeStatusCard stats={nodeStats} />
        </div>
        
        <div className="lg:col-span-1">
          <RecentActivity activities={recentActivities} />
        </div>
        
        <div className="lg:col-span-1">
          <PeersList peers={connectedPeers} />
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
              <span className="text-success font-medium">Excellent</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">DHT Coverage</span>
              <span className="text-file-shared font-medium">Good</span>
            </div>
            <Progress value={78} className="h-2" />
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