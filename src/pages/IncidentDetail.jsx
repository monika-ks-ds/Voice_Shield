import { useParams, Link } from 'react-router-dom'
import { Header, RiskGauge, IncidentTimeline, EvidenceCard, ThreatMeterPill } from '../components'
import { MOCK_INCIDENTS } from '../lib/mockData'
import { ChevronLeft, Phone, Clock, AlertTriangle } from 'lucide-react'

export default function IncidentDetail({ user }) {
  const { id } = useParams()
  const incident = MOCK_INCIDENTS.find((inc) => inc.id === id)

  if (!incident) {
    return (
      <div className="min-h-screen bg-vs-darker">
        <Header user={user} />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/incidents" className="flex items-center gap-2 text-vs-red hover:text-vs-red-light mb-8">
            <ChevronLeft size={20} />
            Back to Incidents
          </Link>
          <div className="card p-12 text-center">
            <p className="text-gray-400 text-lg">Incident not found</p>
          </div>
        </main>
      </div>
    )
  }

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

  const finalRisk = incident.events[incident.events.length - 1]?.overallRisk || 0

  return (
    <div className="min-h-screen bg-vs-darker">
      <Header user={user} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/incidents" className="flex items-center gap-2 text-vs-red hover:text-vs-red-light mb-8 transition-colors">
          <ChevronLeft size={20} />
          Back to Incidents
        </Link>

        {/* Header */}
        <div className="card p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Incident #{incident.id.slice(0, 8)}</h1>
              <p className="text-gray-400">
                {new Date(incident.timestamp).toLocaleString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <ThreatMeterPill score={finalRisk} />
          </div>

          {/* Call Details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Caller Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Caller ID</p>
                    <p className="text-white font-semibold">{incident.callDetails.callerId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="text-white font-semibold">{incident.callDetails.callerNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Call Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-white font-semibold">{incident.callDetails.callDuration}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Outcome</p>
                  <p className={`font-semibold ${getRiskColor()}`}>
                    {incident.recommendedAction}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Gauge */}
        <div className="card p-8 mb-8 flex justify-center">
          <RiskGauge score={finalRisk} animated={false} />
        </div>

        {/* Timeline & Evidence */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-6">
            <IncidentTimeline events={incident.timeline} />
          </div>

          <EvidenceCard evidence={incident.evidence} />
        </div>

        {/* Verification Status */}
        <div className="card p-6 mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Verification Result</h3>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
              incident.verificationResult === 'verified' ? 'bg-vs-green/20' :
              incident.verificationResult === 'failed' ? 'bg-vs-red/20' :
              incident.verificationResult === 'pending' ? 'bg-vs-amber/20' :
              'bg-gray-700/50'
            }`}>
              {incident.verificationResult === 'verified' && <span className="text-2xl">✓</span>}
              {incident.verificationResult === 'failed' && <span className="text-2xl">✕</span>}
              {incident.verificationResult === 'pending' && <span className="text-2xl">⏳</span>}
              {incident.verificationResult === 'not_requested' && <span className="text-2xl">—</span>}
            </div>
            <div>
              <p className="font-semibold text-white mb-1">
                {incident.verificationResult === 'verified' && 'Identity Verified'}
                {incident.verificationResult === 'failed' && 'Verification Failed'}
                {incident.verificationResult === 'pending' && 'Verification Pending'}
                {incident.verificationResult === 'not_requested' && 'Verification Not Requested'}
              </p>
              <p className="text-gray-400 text-sm">
                {incident.verificationResult === 'verified' && 'Caller identity was successfully verified through independent channel'}
                {incident.verificationResult === 'failed' && 'Verification attempt failed. Caller could not be authenticated'}
                {incident.verificationResult === 'pending' && 'Verification process is still in progress'}
                {incident.verificationResult === 'not_requested' && 'No verification was performed for this incident'}
              </p>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="card p-6 mt-8">
          <h3 className="text-lg font-semibold text-white mb-6">Risk Score Evolution</h3>
          <div className="space-y-4">
            {incident.events.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-vs-dark/50 rounded-lg border border-gray-700/50">
                <span className="text-sm text-gray-400">Event {index + 1}</span>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Voice / Speaker / Context / Risk</p>
                    <p className="text-sm text-white font-mono">
                      {Math.round(event.voiceAuthenticity)}% / {Math.round(event.speakerMatch)}% / {Math.round(event.contextRisk)}% / <span className="font-bold text-vs-red">{event.overallRisk}%</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
