import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusIndicator } from "@/components/StatusIndicator"
import { Activity, Users, HardDrive, Network } from "lucide-react"

interface NodeStats {
  peerId: string
  status: 'online' | 'offline' | 'connecting'
  connectedPeers: number
  sharedFiles: number
  networkLatency: number
}

interface NodeStatusCardProps {
  stats: NodeStats
}

export function NodeStatusCard({ stats }: NodeStatusCardProps) {
  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Network className="h-5 w-5 text-primary" />
          Node Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Status</span>
          <StatusIndicator status={stats.status} showPing />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Peer ID</span>
          <span className="text-sm font-mono text-foreground">{stats.peerId.slice(0, 12)}...</span>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center">
            <Users className="h-4 w-4 mx-auto mb-1 text-peer-active" />
            <p className="text-lg font-semibold text-foreground">{stats.connectedPeers}</p>
            <p className="text-xs text-muted-foreground">Peers</p>
          </div>
          
          <div className="text-center">
            <HardDrive className="h-4 w-4 mx-auto mb-1 text-file-shared" />
            <p className="text-lg font-semibold text-foreground">{stats.sharedFiles}</p>
            <p className="text-xs text-muted-foreground">Files</p>
          </div>
          
          <div className="text-center">
            <Activity className="h-4 w-4 mx-auto mb-1 text-primary" />
            <p className="text-lg font-semibold text-foreground">{stats.networkLatency}ms</p>
            <p className="text-xs text-muted-foreground">Latency</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}