import { ChevronRight, AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function IncidentListItem({ incident }) {
  const getRiskColor = () => {
    switch (incident.riskLevel) {
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

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <Link to={`/incidents/${incident.id}`}>
      <div className="card-hover p-4 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <AlertTriangle size={24} className={getRiskColor()} />
            <div className="flex-1">
              <h3 className="font-semibold text-white">Incident #{incident.id.slice(0, 8)}</h3>
              <p className="text-sm text-gray-400 mt-1">
                {formatDate(incident.timestamp)} at {formatTime(incident.timestamp)}
              </p>
            </div>
          </div>
          <div className="text-right mr-2">
            <div className={`font-semibold ${getRiskColor()}`}>
              {incident.riskLevel.toUpperCase()}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Score: {incident.events[incident.events.length - 1]?.overallRisk || 0}%
            </p>
          </div>
          <ChevronRight size={20} className="text-gray-500" />
        </div>
      </div>
    </Link>
  )
}
