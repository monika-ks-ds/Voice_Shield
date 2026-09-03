import { useState, useEffect } from 'react'
import { Header, RiskGauge, SubScoreBar, LiveWaveform, IncidentTimeline, EvidenceCard } from '../components'
import { ATTACK_SCENARIOS, MOCK_EVIDENCE } from '../lib/mockData'
import { getWebSocketClient, resetWebSocketClient } from '../lib/websocketClient'
import { Play, Square, RotateCcw, Info } from 'lucide-react'

export default function AttackLab({ user }) {
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [riskData, setRiskData] = useState({
    voiceAuthenticity: 0,
    speakerMatch: 0,
    conversationRisk: 0,
    contextRisk: 0,
    overallRisk: 0,
  })
  const [evidence, setEvidence] = useState([])
  const [timeline, setTimeline] = useState([])
  const [eventIndex, setEventIndex] = useState(0)

  useEffect(() => {
    if (!isRunning || !selectedScenario) return

    const ws = getWebSocketClient()

    ws.connect().then(() => {
      const scenario = ATTACK_SCENARIOS.find((s) => s.id === selectedScenario)
      if (!scenario) return

      ws.startScenarioSimulation(scenario.events, 1500)

      ws.on('riskEvent', (event) => {
        setRiskData({
          voiceAuthenticity: event.voiceAuthenticity,
          speakerMatch: event.speakerMatch,
          conversationRisk: event.conversationRisk,
          contextRisk: event.contextRisk,
          overallRisk: event.overallRisk,
        })

        // Get evidence based on scenario
        const evidenceKey = selectedScenario
        const scenarioEvidence = MOCK_EVIDENCE[evidenceKey] || []
        setEvidence(scenarioEvidence.slice(0, 3))

        setEventIndex((prev) => prev + 1)
      })
    })

    return () => {
      ws.stopSimulation()
      ws.disconnect()
    }
  }, [isRunning, selectedScenario])

  const handleStartScenario = (scenarioId) => {
    resetWebSocketClient()
    setSelectedScenario(scenarioId)
    setIsRunning(true)
    setRiskData({
      voiceAuthenticity: 0,
      speakerMatch: 0,
      conversationRisk: 0,
      contextRisk: 0,
      overallRisk: 0,
    })
    setEvidence([])
    setEventIndex(0)
  }

  const handleStop = () => {
    setIsRunning(false)
    resetWebSocketClient()
  }

  const handleReset = () => {
    setIsRunning(false)
    setSelectedScenario(null)
    setRiskData({
      voiceAuthenticity: 0,
      speakerMatch: 0,
      conversationRisk: 0,
      contextRisk: 0,
      overallRisk: 0,
    })
    setEvidence([])
    setEventIndex(0)
    resetWebSocketClient()
  }

  const scenario = ATTACK_SCENARIOS.find((s) => s.id === selectedScenario)

  return (
    <div className="min-h-screen bg-vs-darker">
      <Header user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Attack Lab</h1>
          <p className="text-gray-400">
            Explore different attack scenarios and see how Voice-Shield detects them in real time.
          </p>
        </div>

        {!isRunning ? (
          <>
            {/* Scenarios Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {ATTACK_SCENARIOS.map((sc) => (
                <div
                  key={sc.id}
                  className="card p-6 hover:border-vs-red/50 transition-all group cursor-pointer"
                  onClick={() => handleStartScenario(sc.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${sc.color}/20`}>
                      <span className="text-2xl">📞</span>
                    </div>
                    <Play className="text-gray-500 group-hover:text-vs-red transition-colors" size={20} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{sc.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{sc.description}</p>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-vs-red/20 text-vs-red rounded-lg group-hover:bg-vs-red group-hover:text-white transition-all text-sm font-semibold">
                    <Play size={14} />
                    Run Scenario
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Scenario Running */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{scenario?.name}</h2>
                  <p className="text-gray-400 text-sm mt-1">{scenario?.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleStop}
                    className="flex items-center gap-2 px-4 py-2 bg-vs-red hover:bg-vs-red-dark text-white rounded-lg font-semibold transition-all"
                  >
                    <Square size={18} />
                    Stop
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 bg-vs-navy hover:bg-vs-navy-light text-white rounded-lg font-semibold transition-all"
                  >
                    <RotateCcw size={18} />
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Waveform */}
            <div className="card p-6 mb-8">
              <LiveWaveform />
            </div>

            {/* Risk Gauge */}
            <div className="card p-8 mb-8 flex justify-center">
              <RiskGauge score={riskData.overallRisk} animated={true} />
            </div>

            {/* Sub-Scores */}
            <div className="card p-6 mb-8">
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
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <EvidenceCard evidence={evidence} />

              <div className="card p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Info size={20} className="text-vs-cyan" />
                  About This Attack
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {scenario?.id === 'genuine' && 'A legitimate phone call from a trusted contact. Voice characteristics match the enrollment profile, and the conversation follows natural patterns.'}
                  {scenario?.id === 'synthetic' && 'This attack uses AI-generated voice synthesis to impersonate a trusted contact. Voice-Shield detects synthetic artifacts and unnatural prosody patterns.'}
                  {scenario?.id === 'replay' && 'A previously recorded call is replayed to trick the system. Subtle acoustic anomalies and repetitive patterns reveal the replay attack.'}
                  {scenario?.id === 'voice-conversion' && 'Voice conversion technology is used to transform one person\'s voice into another. Detection focuses on conversion artifacts and speaker identity mismatches.'}
                  {scenario?.id === 'social-engineering' && 'A legitimate voice uses social engineering tactics to manipulate the victim into sharing sensitive information or taking unwanted actions.'}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Simulation Progress</h3>
              <div className="w-full bg-vs-dark rounded-lg overflow-hidden h-2">
                <div
                  className="h-full bg-gradient-to-r from-vs-red to-vs-navy transition-all duration-300"
                  style={{ width: `${(eventIndex / (scenario?.events.length || 1)) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 mt-3">
                Event {eventIndex} of {scenario?.events.length || 0}
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
