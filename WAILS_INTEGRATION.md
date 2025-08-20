# FileNest - Wails Go Integration

This project is now fully integrated with **Wails Go** for peer-to-peer file sharing functionality.

## Wails Integration Features

### ✅ **Backend API Bindings**
- Complete TypeScript definitions for Go backend functions
- Type-safe function calls to Wails Go methods
- Error handling and fallback for non-Wails environments

### ✅ **Real-time Event System**
- WebSocket-like events from Go backend to React frontend
- Live updates for peer connections, file operations, and network status
- Toast notifications for user feedback

### ✅ **React Query Integration**
- Automatic data fetching and caching
- Background refetching for real-time data
- Optimistic updates and error handling

## Backend Functions Required

Your Wails Go application should implement these functions:

### Node Management
```go
func (a *App) GetNodeStats() NodeStats
func (a *App) StartNode() bool
func (a *App) StopNode() bool
```

### Peer Management
```go
func (a *App) GetConnectedPeers() []Peer
func (a *App) ConnectToPeer(address string) bool
func (a *App) DisconnectFromPeer(peerId string) bool
```

### File Operations
```go
func (a *App) GetSharedFiles() []FileInfo
func (a *App) ShareFile(filePath string) bool
func (a *App) UploadFile(filePath string) string
func (a *App) DownloadFile(hash string, peerId string) bool
```

### Search & Analytics
```go
func (a *App) SearchByEmbedding(query string, threshold float64) []SearchResult
func (a *App) GetNetworkMetrics() NetworkMetrics
func (a *App) GetRecentActivity() []ActivityItem
```

## Event Emission

Emit these events from your Go backend for real-time updates:

```go
runtime.EventsEmit(ctx, "peer:connected", map[string]interface{}{
    "peerId": peerID,
})

runtime.EventsEmit(ctx, "file:uploaded", map[string]interface{}{
    "fileName": fileName,
    "hash": fileHash,
})

runtime.EventsEmit(ctx, "network:stats_updated", nil)
```

## Development Setup

1. **Install Wails CLI**: `go install github.com/wailsapp/wails/v2/cmd/wails@latest`
2. **Build for development**: `wails dev`
3. **Build for production**: `wails build`

## Frontend Development

The React frontend will automatically detect if it's running in a Wails environment and:
- Use real backend functions when available
- Fall back to mock data for browser-only development
- Show appropriate error states for connection issues

## Type Safety

All backend communications are fully typed with TypeScript interfaces that match your Go structs. The frontend provides loading states, error handling, and real-time updates for all network operations.

Ready for P2P file sharing! 🚀