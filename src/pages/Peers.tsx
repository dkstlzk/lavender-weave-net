import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatusIndicator } from "@/components/StatusIndicator"
import { Users, Plus, Signal, Globe, Clock, HardDrive } from "lucide-react"
import { useState } from "react"

// Mock peer data
const peers = [
  { 
    id: '12D3KooWBhvxGtDzMpqrP5gC8fD9c1mVz2hJkLpQx3aBcDeF4GhI', 
    address: '/ip4/192.168.1.100/tcp/4001',
    status: 'online' as const,
    latency: 25,
    filesShared: 34,
    lastSeen: '1 min ago',
    location: 'New York, US',
    bandwidth: '100 Mbps'
  },
  { 
    id: '12D3KooWFE2n7kJv4mC8PqRpYx1bN3sT9uVwXkZeF2hI7jMpL4oQ', 
    address: '/ip4/10.0.0.45/tcp/4001',
    status: 'online' as const,
    latency: 67,
    filesShared: 89,
    lastSeen: '3 min ago',
    location: 'London, UK',
    bandwidth: '50 Mbps'
  },
  { 
    id: '12D3KooWQr8vN2pM5xL1kJeH9aBcDfGhI6mNoPq3RsTuVwXyZ4F7', 
    address: '/ip4/172.16.0.12/tcp/4001',
    status: 'connecting' as const,
    latency: 120,
    filesShared: 12,
    lastSeen: '5 min ago',
    location: 'Tokyo, JP',
    bandwidth: '200 Mbps'
  },
]

export default function PeersPage() {
  const [newPeerAddress, setNewPeerAddress] = useState('')

  const handleConnectPeer = () => {
    console.log('Connecting to peer:', newPeerAddress)
    setNewPeerAddress('')
  }

  const getLatencyColor = (latency: number) => {
    if (latency < 50) return 'text-success'
    if (latency < 150) return 'text-warning'
    return 'text-destructive'
  }

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Peer Network</h1>
            <p className="text-muted-foreground">Manage connections to other nodes in the network</p>
          </div>
          
          <div className="flex gap-3">
            <Button className="bg-gradient-primary shadow-primary hover:shadow-glow transition-all">
              <Plus className="h-4 w-4 mr-2" />
              Connect Peer
            </Button>
          </div>
        </div>

        {/* Connect New Peer */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-foreground">Connect to Peer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter peer multiaddress (e.g., /ip4/192.168.1.100/tcp/4001/p2p/12D3...)"
                value={newPeerAddress}
                onChange={(e) => setNewPeerAddress(e.target.value)}
                className="flex-1 bg-background/50 border-border/50"
              />
              <Button 
                onClick={handleConnectPeer}
                disabled={!newPeerAddress.trim()}
                className="bg-gradient-primary shadow-primary hover:shadow-glow transition-all"
              >
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Peer Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-success/10">
                  <Users className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{peers.filter(p => p.status === 'online').length}</p>
                  <p className="text-sm text-muted-foreground">Online Peers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Signal className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">45ms</p>
                  <p className="text-sm text-muted-foreground">Avg Latency</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-file-shared/10">
                  <HardDrive className="h-6 w-6 text-file-shared" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">135</p>
                  <p className="text-sm text-muted-foreground">Total Files</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-warning/10">
                  <Globe className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Regions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Peer List */}
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-foreground">Connected Peers</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {peers.length} total
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {peers.map((peer) => (
                  <div
                    key={peer.id}
                    className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <StatusIndicator status={peer.status} showPing />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {peer.id.slice(0, 20)}...
                          </p>
                          <p className="text-xs text-muted-foreground">{peer.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                          Disconnect
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Signal className="h-4 w-4 text-muted-foreground" />
                        <span className={getLatencyColor(peer.latency)}>
                          {peer.latency}ms
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{peer.filesShared} files</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{peer.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{peer.lastSeen}</span>
                      </div>
                    </div>
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