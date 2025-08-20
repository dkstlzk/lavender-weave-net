interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'connecting'
  label?: string
  showPing?: boolean
}

export function StatusIndicator({ status, label, showPing = false }: StatusIndicatorProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'bg-node-online'
      case 'offline':
        return 'bg-node-offline'
      case 'connecting':
        return 'bg-warning'
      default:
        return 'bg-muted'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'online':
        return 'Online'
      case 'offline':
        return 'Offline'
      case 'connecting':
        return 'Connecting'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={`h-2 w-2 rounded-full ${getStatusColor()}`} />
        {showPing && status === 'online' && (
          <div className={`absolute inset-0 h-2 w-2 rounded-full ${getStatusColor()} animate-status-ping`} />
        )}
      </div>
      {label && (
        <span className="text-sm text-muted-foreground">
          {label || getStatusText()}
        </span>
      )}
    </div>
  )
}