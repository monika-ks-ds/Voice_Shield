import { AlertCircle } from 'lucide-react'

export default function ThreatMeterPill({ score = 0 }) {
  const getRiskStatus = () => {
    if (score < 33) {
      return { label: 'LOW RISK', color: 'bg-vs-green/20 text-vs-green border-vs-green/30' }
    }
    if (score < 67) {
      return { label: 'SUSPICIOUS', color: 'bg-vs-amber/20 text-vs-amber border-vs-amber/30' }
    }
    return { label: 'HIGH RISK', color: 'bg-vs-red/20 text-vs-red border-vs-red/30' }
  }

  const status = getRiskStatus()

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${status.color} font-semibold text-sm animate-fade-in`}>
      <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
      <span>{status.label}</span>
      <span className="text-xs opacity-75">({score}%)</span>
    </div>
  )
}
