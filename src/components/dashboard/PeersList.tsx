import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatusIndicator } from "@/components/StatusIndicator"
import { Badge } from "@/components/ui/badge"
import { Signal } from "lucide-react"

interface Peer {
  id: string
  address: string
  status: 'online' | 'offline' | 'connecting'
  latency: number
  filesShared: number
  lastSeen: string
}

interface PeersListProps {
  peers: Peer[]
}

export function PeersList({ peers }: PeersListProps) {
  const getLatencyColor = (latency: number) => {
    if (latency < 50) return 'text-success'
    if (latency < 150) return 'text-warning'
    return 'text-destructive'
  }

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-foreground">
          <span>Connected Peers</span>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            {peers.filter(p => p.status === 'online').length} online
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {peers.map((peer) => (
              <div key={peer.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <StatusIndicator status={peer.status} />
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {peer.id.slice(0, 16)}...
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {peer.address}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Signal className="h-3 w-3" />
                    <span className={`text-xs font-medium ${getLatencyColor(peer.latency)}`}>
                      {peer.latency}ms
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {peer.filesShared} files
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}