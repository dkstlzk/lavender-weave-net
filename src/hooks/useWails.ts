import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { WailsAPI } from '@/lib/wails'
import { useToast } from '@/hooks/use-toast'

// Custom hooks for Wails backend integration

// Node management hooks
export function useNodeStats() {
  return useQuery({
    queryKey: ['nodeStats'],
    queryFn: WailsAPI.getNodeStats,
    refetchInterval: 5000, // Refresh every 5 seconds
    retry: 3,
  })
}

export function useStartNode() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: WailsAPI.startNode,
    onSuccess: (success) => {
      if (success) {
        toast({
          title: "Node Started",
          description: "FileNest node is now online",
        })
        queryClient.invalidateQueries({ queryKey: ['nodeStats'] })
      } else {
        toast({
          title: "Failed to Start Node",
          description: "Could not start the FileNest node",
          variant: "destructive",
        })
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to start node",
        variant: "destructive",
      })
    }
  })
}

export function useStopNode() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: WailsAPI.stopNode,
    onSuccess: (success) => {
      if (success) {
        toast({
          title: "Node Stopped",
          description: "FileNest node is now offline",
        })
        queryClient.invalidateQueries({ queryKey: ['nodeStats'] })
      }
    }
  })
}

// Peer management hooks
export function useConnectedPeers() {
  return useQuery({
    queryKey: ['connectedPeers'],
    queryFn: WailsAPI.getConnectedPeers,
    refetchInterval: 10000, // Refresh every 10 seconds
  })
}

export function useConnectToPeer() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: WailsAPI.connectToPeer,
    onSuccess: (success, address) => {
      if (success) {
        toast({
          title: "Peer Connected",
          description: `Successfully connected to ${address}`,
        })
        queryClient.invalidateQueries({ queryKey: ['connectedPeers'] })
        queryClient.invalidateQueries({ queryKey: ['nodeStats'] })
      } else {
        toast({
          title: "Connection Failed",
          description: `Could not connect to ${address}`,
          variant: "destructive",
        })
      }
    },
    onError: () => {
      toast({
        title: "Connection Error",
        description: "Failed to connect to peer",
        variant: "destructive",
      })
    }
  })
}

export function useDisconnectFromPeer() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: WailsAPI.disconnectFromPeer,
    onSuccess: (success) => {
      if (success) {
        toast({
          title: "Peer Disconnected",
          description: "Successfully disconnected from peer",
        })
        queryClient.invalidateQueries({ queryKey: ['connectedPeers'] })
        queryClient.invalidateQueries({ queryKey: ['nodeStats'] })
      }
    }
  })
}

// File management hooks
export function useSharedFiles() {
  return useQuery({
    queryKey: ['sharedFiles'],
    queryFn: WailsAPI.getSharedFiles,
    refetchInterval: 30000, // Refresh every 30 seconds
  })
}

export function useShareFile() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: WailsAPI.shareFile,
    onSuccess: (success, filePath) => {
      if (success) {
        toast({
          title: "File Shared",
          description: `${filePath} is now shared on the network`,
        })
        queryClient.invalidateQueries({ queryKey: ['sharedFiles'] })
        queryClient.invalidateQueries({ queryKey: ['nodeStats'] })
      } else {
        toast({
          title: "Share Failed",
          description: `Could not share ${filePath}`,
          variant: "destructive",
        })
      }
    }
  })
}

export function useUploadFile() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: WailsAPI.uploadFile,
    onSuccess: (hash, filePath) => {
      if (hash) {
        toast({
          title: "File Uploaded",
          description: `${filePath} uploaded with hash: ${String(hash).slice(0, 16)}...`,
        })
        queryClient.invalidateQueries({ queryKey: ['sharedFiles'] })
        queryClient.invalidateQueries({ queryKey: ['recentActivity'] })
      }
    },
    onError: () => {
      toast({
        title: "Upload Failed",
        description: "Could not upload file to network",
        variant: "destructive",
      })
    }
  })
}

export function useDownloadFile() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ hash, peerId }: { hash: string; peerId: string }) => 
      WailsAPI.downloadFile(hash, peerId),
    onSuccess: (success) => {
      if (success) {
        toast({
          title: "Download Started",
          description: "File download has begun",
        })
        queryClient.invalidateQueries({ queryKey: ['recentActivity'] })
      } else {
        toast({
          title: "Download Failed",
          description: "Could not start file download",
          variant: "destructive",
        })
      }
    }
  })
}

// Search hooks
export function useEmbeddingSearch() {
  const { toast } = useToast()
  
  return useMutation({
    mutationFn: ({ query, threshold }: { query: string; threshold: number }) =>
      WailsAPI.searchByEmbedding(query, threshold),
    onError: () => {
      toast({
        title: "Search Failed",
        description: "Could not perform embedding search",
        variant: "destructive",
      })
    }
  })
}

export function useKeywordSearch() {
  return useMutation({
    mutationFn: WailsAPI.searchByKeyword,
  })
}

// Network analytics hooks
export function useNetworkMetrics() {
  return useQuery({
    queryKey: ['networkMetrics'],
    queryFn: WailsAPI.getNetworkMetrics,
    refetchInterval: 15000, // Refresh every 15 seconds
  })
}

export function useRecentActivity() {
  return useQuery({
    queryKey: ['recentActivity'],
    queryFn: WailsAPI.getRecentActivity,
    refetchInterval: 10000, // Refresh every 10 seconds
  })
}

export function useNetworkEvents() {
  return useQuery({
    queryKey: ['networkEvents'],
    queryFn: WailsAPI.getNetworkEvents,
    refetchInterval: 5000, // Refresh every 5 seconds
  })
}