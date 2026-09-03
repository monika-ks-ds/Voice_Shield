export function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export function formatDateTime(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function formatDate(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function generateIncidentId() {
  return `incident_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function generateCallId() {
  return `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function calculateRiskLevel(score) {
  if (score < 33) return 'low'
  if (score < 67) return 'medium'
  return 'high'
}

export function getRiskColor(level) {
  switch (level) {
    case 'low':
      return '#10b981'
    case 'medium':
      return '#f59e0b'
    case 'high':
      return '#dc2626'
    default:
      return '#6b7280'
  }
}

export function getRiskBgClass(level) {
  switch (level) {
    case 'low':
      return 'bg-vs-green/10 border-vs-green/30'
    case 'medium':
      return 'bg-vs-amber/10 border-vs-amber/30'
    case 'high':
      return 'bg-vs-red/10 border-vs-red/30'
    default:
      return 'bg-gray-800/10 border-gray-700/30'
  }
}

export function getRiskTextClass(level) {
  switch (level) {
    case 'low':
      return 'text-vs-green'
    case 'medium':
      return 'text-vs-amber'
    case 'high':
      return 'text-vs-red-light'
    default:
      return 'text-gray-400'
  }
}
