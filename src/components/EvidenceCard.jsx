import { ChevronDown, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function EvidenceCard({ evidence = [] }) {
  const [expanded, setExpanded] = useState(false)

  const getSeverity = (text) => {
    if (text.includes('high') || text.includes('strong') || text.includes('detected')) return 'high'
    if (text.includes('suspicious') || text.includes('unusual')) return 'medium'
    return 'low'
  }

  const getIcon = (text) => {
    if (text.includes('voice')) return '🎤'
    if (text.includes('speaker')) return '👤'
    if (text.includes('conversation')) return '💬'
    if (text.includes('context')) return '📍'
    if (text.includes('password') || text.includes('OTP')) return '🔐'
    return '⚠️'
  }

  return (
    <div className="w-full card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="text-vs-cyan flex-shrink-0" size={20} />
          <div className="text-left">
            <h3 className="font-semibold text-white">Analysis Evidence</h3>
            <p className="text-xs text-gray-400">{evidence.length} signals detected</p>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && (
        <div className="border-t border-gray-700/50 px-4 py-3 bg-vs-darker/50 space-y-2 max-h-64 overflow-y-auto">
          {evidence.length > 0 ? (
            evidence.map((item, index) => {
              const severity = getSeverity(item)
              const icon = getIcon(item)
              const severityColor = {
                high: 'text-vs-red-light',
                medium: 'text-vs-amber',
                low: 'text-vs-green',
              }

              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 rounded bg-gray-800/30 border border-gray-700/30"
                >
                  <span className="text-lg flex-shrink-0">{icon}</span>
                  <p className={`text-sm ${severityColor[severity]} leading-relaxed`}>
                    {item}
                  </p>
                </div>
              )
            })
          ) : (
            <p className="text-sm text-gray-400 py-2">No evidence signals detected yet.</p>
          )}
        </div>
      )}
    </div>
  )
}
