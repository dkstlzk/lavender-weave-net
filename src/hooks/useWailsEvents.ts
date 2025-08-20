import { useEffect } from 'react'
import { Events } from '@wailsio/runtime'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'

// Real-time event system for Wails integration
export function useWailsEvents() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  useEffect(() => {
    // Check if we're in Wails environment
    if (typeof window === 'undefined' || !Events) return

    // Listen for peer connection events
    const unsubscribePeerConnected = Events.On('peer:connected', (data: any) => {
      toast({
        title: "Peer Connected",
        description: `Connected to ${data.peerId?.slice(0, 12)}...`,
      })
      queryClient.invalidateQueries({ queryKey: ['connectedPeers'] })
      queryClient.invalidateQueries({ queryKey: ['nodeStats'] })
    })

    const unsubscribePeerDisconnected = Events.On('peer:disconnected', (data: any) => {
      toast({
        title: "Peer Disconnected",
        description: `Lost connection to ${data.peerId?.slice(0, 12)}...`,
        variant: "destructive",
      })
      queryClient.invalidateQueries({ queryKey: ['connectedPeers'] })
      queryClient.invalidateQueries({ queryKey: ['nodeStats'] })
    })

    // Listen for file events
    const unsubscribeFileUploaded = Events.On('file:uploaded', (data: any) => {
      toast({
        title: "File Uploaded",
        description: `${data.fileName} is now shared on the network`,
      })
      queryClient.invalidateQueries({ queryKey: ['sharedFiles'] })
      queryClient.invalidateQueries({ queryKey: ['recentActivity'] })
    })

    const unsubscribeFileDownloaded = Events.On('file:downloaded', (data: any) => {
      toast({
        title: "Download Complete",
        description: `${data.fileName} has been downloaded`,
      })
      queryClient.invalidateQueries({ queryKey: ['recentActivity'] })
    })

    // Listen for search events
    const unsubscribeSearchCompleted = Events.On('search:completed', (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['recentActivity'] })
    })

    // Listen for network events
    const unsubscribeNetworkStats = Events.On('network:stats_updated', () => {
      queryClient.invalidateQueries({ queryKey: ['networkMetrics'] })
      queryClient.invalidateQueries({ queryKey: ['nodeStats'] })
    })

    // Listen for errors
    const unsubscribeError = Events.On('error', (data: any) => {
      toast({
        title: "Error",
        description: data.message || "An error occurred",
        variant: "destructive",
      })
    })

    // Cleanup listeners on unmount
    return () => {
      unsubscribePeerConnected?.()
      unsubscribePeerDisconnected?.()
      unsubscribeFileUploaded?.()
      unsubscribeFileDownloaded?.()
      unsubscribeSearchCompleted?.()
      unsubscribeNetworkStats?.()
      unsubscribeError?.()
    }
  }, [queryClient, toast])
}

// Hook to check if we're running in Wails environment
export function useWailsEnvironment() {
  return typeof window !== 'undefined' && window.go !== undefined
}