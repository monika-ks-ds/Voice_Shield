// Simulated WebSocket client for real-time data streaming
export class MockWebSocketClient {
  constructor(url) {
    this.url = url
    this.listeners = {}
    this.eventQueue = []
    this.isConnected = false
    this.simulationActive = false
  }

  connect() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isConnected = true
        this.emit('open', { type: 'open' })
        resolve()
      }, 500)
    })
  }

  disconnect() {
    this.isConnected = false
    this.simulationActive = false
    this.emit('close', { type: 'close' })
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => {
        callback(data)
      })
    }
  }

  // Start simulating risk events from a scenario
  startScenarioSimulation(scenarioEvents, speed = 1000) {
    if (this.simulationActive) return

    this.simulationActive = true
    let eventIndex = 0

    const simulateEvent = () => {
      if (!this.simulationActive || eventIndex >= scenarioEvents.length) {
        this.simulationActive = false
        return
      }

      const event = scenarioEvents[eventIndex]
      const riskEvent = {
        timestamp: new Date().toISOString(),
        voiceAuthenticity: event.voiceAuthenticity,
        speakerMatch: event.speakerMatch,
        conversationRisk: event.conversationRisk,
        contextRisk: event.contextRisk,
        overallRisk: Math.round(
          (event.voiceAuthenticity * 0.25 + 
           (100 - event.speakerMatch) * 0.25 + 
           event.conversationRisk * 0.25 + 
           event.contextRisk * 0.25)
        ),
        riskLevel: this.calculateRiskLevel(event.overallRisk),
        evidence: [],
      }

      this.emit('riskEvent', riskEvent)
      eventIndex++

      setTimeout(simulateEvent, speed)
    }

    simulateEvent()
  }

  // Stop the simulation
  stopSimulation() {
    this.simulationActive = false
  }

  // Generate random events (for continuous simulation)
  startRandomSimulation(speed = 1000) {
    if (this.simulationActive) return

    this.simulationActive = true

    const generateEvent = () => {
      if (!this.simulationActive) return

      const event = {
        timestamp: new Date().toISOString(),
        voiceAuthenticity: Math.max(0, Math.min(100, 50 + Math.random() * 50 - 25)),
        speakerMatch: Math.max(0, Math.min(100, 50 + Math.random() * 50 - 25)),
        conversationRisk: Math.max(0, Math.min(100, 50 + Math.random() * 50 - 25)),
        contextRisk: Math.max(0, Math.min(100, 50 + Math.random() * 50 - 25)),
        overallRisk: 0,
        riskLevel: 'medium',
        evidence: [],
      }

      // Calculate overall risk
      event.overallRisk = Math.round(
        (event.voiceAuthenticity * 0.25 + 
         (100 - event.speakerMatch) * 0.25 + 
         event.conversationRisk * 0.25 + 
         event.contextRisk * 0.25)
      )

      event.riskLevel = this.calculateRiskLevel(event.overallRisk)

      this.emit('riskEvent', event)

      setTimeout(generateEvent, speed)
    }

    generateEvent()
  }

  calculateRiskLevel(score) {
    if (score < 33) return 'low'
    if (score < 67) return 'medium'
    return 'high'
  }

  send(data) {
    // Simulate sending data to the server
    console.log('WebSocket message sent:', data)
    this.emit('message', { type: 'ack', data })
  }
}

// Create a singleton instance
let wsClient = null

export function getWebSocketClient(url = 'ws://localhost:8000') {
  if (!wsClient) {
    wsClient = new MockWebSocketClient(url)
  }
  return wsClient
}

export function resetWebSocketClient() {
  if (wsClient) {
    wsClient.disconnect()
    wsClient = null
  }
}
