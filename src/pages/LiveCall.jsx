import { useState, useEffect } from 'react'
import { Header, RiskGauge, LiveWaveform, SubScoreBar, AlertBanner, EvidenceCard, ThreatMeterPill, LatencyBadge } from '../components'
import { Phone, PhoneOff, Volume2, Mic } from 'lucide-react'
import { getWebSocketClient, resetWebSocketClient } from '../lib/websocketClient'
import { calculateRiskLevel } from '../lib/utils'

export default function LiveCall({ user }) {
  const [callActive, setCallActive] = useState(false)
  const [callTime, setCallTime] = useState(0)
  const [callerInfo, setCallerInfo] = useState(null)
  const [riskData, setRiskData] = useState({
    voiceAuthenticity: 0,
    speakerMatch: 0,
    conversationRisk: 0,
    contextRisk: 0,
    overallRisk: 0,
    evidence: [],
  })
  const [alertTriggered, setAlertTriggered] = useState(false)
  const [listening, setListening] = useState(false)

  const mockCallers = [
    { name: 'Mom', number: '+1-555-0101', isEnrolled: true },
    { name: 'Unknown', number: '+1-555-9999', isEnrolled: false },
    { name: 'Bank Support', number: '+1-800-MYBANK', isEnrolled: true },
  ]

  useEffect(() => {
    if (!callActive) return

    // Simulate call timer
    const timer = setInterval(() => {
      setCallTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [callActive])

  useEffect(() => {
    if (!callActive) return

    // Simulate WebSocket connection and risk stream
    const ws = getWebSocketClient()

    ws.connect().then(() => {
      setListening(true)

      // Simulate initial listening period
      setTimeout(() => {
        setListening(false)
      }, 2000)

      // Start simulating risk events
      ws.startRandomSimulation(1200)

      ws.on('riskEvent', (event) => {
        setRiskData((prev) => ({
          ...prev,
          voiceAuthenticity: event.voiceAuthenticity,
          speakerMatch: event.speakerMatch,
          conversationRisk: event.conversationRisk,
          contextRisk: event.contextRisk,
          overallRisk: event.overallRisk,
          evidence: generateEvidence(event),
        }))

        // Trigger alert if risk is high
        if (event.overallRisk > 70 && !alertTriggered) {
          setAlertTriggered(true)
        }
      })
    })

    return () => {
      ws.stopSimulation()
      ws.disconnect()
    }
  }, [callActive, alertTriggered])

  const generateEvidence = (event) => {
    const evidence = []

    if (event.voiceAuthenticity < 40) {
      evidence.push('Voice shows signs of synthetic generation')
    }
    if (event.speakerMatch < 30) {
      evidence.push('Speaker profile does not match trusted contacts')
    }
    if (event.conversationRisk > 70) {
      evidence.push('Unusual conversation patterns detected')
    }
    if (event.contextRisk > 75) {
      evidence.push('Context anomalies suggest potential fraud attempt')
    }

    return evidence.slice(0, 3)
  }

  const startCall = () => {
    const randomCaller = mockCallers[Math.floor(Math.random() * mockCallers.length)]
    setCallerInfo(randomCaller)
    setCallActive(true)
    setAlertTriggered(false)
    setRiskData({
      voiceAuthenticity: 0,
      speakerMatch: 0,
      conversationRisk: 0,
      contextRisk: 0,
      overallRisk: 0,
      evidence: [],
    })
  }

  const endCall = () => {
    setCallActive(false)
    setListening(false)
    setAlertTriggered(false)
    setCallTime(0)
    resetWebSocketClient()
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-vs-darker">
      <Header user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!callActive ? (
          // Idle State
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Live Call Analysis</h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                Voice-Shield monitors incoming calls in real time, analyzing voice authenticity, speaker identity, and conversation context.
              </p>
            </div>

            <button
              onClick={startCall}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-vs-red to-vs-red-dark hover:shadow-glow-red text-white rounded-lg font-bold text-lg transition-all animate-pulse"
            >
              <Phone size={24} />
              Simulate Incoming Call
            </button>

            <p className="text-gray-500 text-sm mt-4">
              Click above to start a simulated call
            </p>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Call Header */}
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-vs-red/50 to-vs-navy/50 rounded-lg flex items-center justify-center animate-pulse">
                    <span className="text-3xl">📞</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{callerInfo?.name}</h2>
                    <p className="text-gray-400">{callerInfo?.number}</p>
                    {callerInfo?.isEnrolled && (
                      <span className="inline-block px-2 py-1 mt-2 bg-vs-green/20 text-vs-green text-xs font-semibold rounded">
                        ✓ Enrolled
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-bold text-vs-red font-mono">
                    {formatTime(callTime)}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <Volume2 size={20} className="text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <Mic size={20} className="text-gray-400" />
                    </button>
                    <button
                      onClick={endCall}
                      className="p-2 bg-vs-red hover:bg-vs-red-dark rounded-lg transition-colors"
                    >
                      <PhoneOff size={20} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Listening State */}
            {listening && (
              <div className="card p-8 text-center bg-vs-navy/20 border-vs-navy/50">
                <div className="inline-block">
                  <div className="w-16 h-16 bg-vs-cyan/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <Mic className="text-vs-cyan" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Listening to the call…</h3>
                <p className="text-gray-400">Analyzing voice, speaker, and conversation…</p>
              </div>
            )}

            {!listening && (
              <>
                {/* Waveform */}
                <div className="card p-6">
                  <LiveWaveform />
                </div>

                {/* Risk Status Bar */}
                <div className="card p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Current Risk Assessment</p>
                    <ThreatMeterPill score={Math.round(riskData.overallRisk)} />
                  </div>
                  <LatencyBadge latency={1.2} />
                </div>

                {/* Main Risk Gauge */}
                <div className="card p-8 flex justify-center">
                  <RiskGauge score={riskData.overallRisk} animated={true} />
                </div>

                {/* Sub-Scores */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Risk Components</h3>
                  <div className="space-y-6">
                    <SubScoreBar
                      label="Voice Authenticity"
                      value={riskData.voiceAuthenticity}
                      icon={() => <span>🎤</span>}
                    />
                    <SubScoreBar
                      label="Speaker Match"
                      value={riskData.speakerMatch}
                      icon={() => <span>👤</span>}
                    />
                    <SubScoreBar
                      label="Conversation Risk"
                      value={100 - riskData.conversationRisk}
                      icon={() => <span>💬</span>}
                    />
                    <SubScoreBar
                      label="Context Risk"
                      value={100 - riskData.contextRisk}
                      icon={() => <span>📍</span>}
                    />
                  </div>
                </div>

                {/* Evidence */}
                <EvidenceCard evidence={riskData.evidence} />

                {/* Alert */}
                {alertTriggered && (
                  <AlertBanner
                    visible={true}
                    onVerify={() => {
                      // TODO: Navigate to verification flow
                      alert('Verification flow would start here')
                    }}
                    onEndCall={endCall}
                  />
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
