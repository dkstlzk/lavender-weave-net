import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatusIndicator } from "@/components/StatusIndicator"
import { Users, Plus, Signal, Globe, Clock, HardDrive } from "lucide-react"
import { useState } from "react"
import { useConnectedPeers, useConnectToPeer, useDisconnectFromPeer } from "@/hooks/useWails"

export default function PeersPage() {
  const [newPeerAddress, setNewPeerAddress] = useState('')
  
  const { data: peers, isLoading, error } = useConnectedPeers()
  const connectToPeer = useConnectToPeer()
  const disconnectFromPeer = useDisconnectFromPeer()

  const handleConnectPeer = async () => {
    if (!newPeerAddress.trim()) return
    
    try {
      await connectToPeer.mutateAsync(newPeerAddress)
      setNewPeerAddress('')
    } catch (error) {
      console.error('Failed to connect to peer:', error)
    }
  }

  const handleDisconnectPeer = async (peerId: string) => {
    try {
      await disconnectFromPeer.mutateAsync(peerId)
    } catch (error) {
      console.error('Failed to disconnect from peer:', error)
    }
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
                disabled={!newPeerAddress.trim() || connectToPeer.isPending}
                className="bg-gradient-primary shadow-primary hover:shadow-glow transition-all"
              >
                {connectToPeer.isPending ? 'Connecting...' : 'Connect'}
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
                  <p className="text-2xl font-bold text-foreground">{peers?.filter(p => p.status === 'online').length || 0}</p>
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
                  <p className="text-2xl font-bold text-foreground">
                    {peers?.length ? Math.round(peers.reduce((acc, p) => acc + p.latency, 0) / peers.length) : 45}ms
                  </p>
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
                  <p className="text-2xl font-bold text-foreground">
                    {peers?.reduce((acc, p) => acc + p.filesShared, 0) || 135}
                  </p>
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
                  <p className="text-2xl font-bold text-foreground">
                    {peers ? new Set(peers.map(p => p.location?.split(',')[1]?.trim())).size : 3}
                  </p>
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
                {peers?.length || 0} total
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 rounded-full bg-muted animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                          <div className="h-3 w-64 bg-muted animate-pulse rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-destructive">Failed to load peers</p>
              </div>
            ) : (
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {peers?.map((peer) => (
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDisconnectPeer(peer.id)}
                        disabled={disconnectFromPeer.isPending}
                      >
                        {disconnectFromPeer.isPending ? 'Disconnecting...' : 'Disconnect'}
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
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}