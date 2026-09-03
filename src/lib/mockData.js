// Mock scenarios for Attack Lab
export const ATTACK_SCENARIOS = [
  {
    id: 'genuine',
    name: 'Genuine Voice Call',
    description: 'Normal conversation from a legitimate caller',
    color: 'vs-green',
    events: [
      { time: 0, voiceAuthenticity: 92, speakerMatch: 95, conversationRisk: 15, contextRisk: 10, overallRisk: 8 },
      { time: 5, voiceAuthenticity: 90, speakerMatch: 93, conversationRisk: 12, contextRisk: 8, overallRisk: 7 },
      { time: 10, voiceAuthenticity: 88, speakerMatch: 94, conversationRisk: 10, contextRisk: 5, overallRisk: 6 },
    ],
  },
  {
    id: 'synthetic',
    name: 'Synthetic Voice Detection',
    description: 'AI-generated voice attempting impersonation',
    color: 'vs-red',
    events: [
      { time: 0, voiceAuthenticity: 45, speakerMatch: 40, conversationRisk: 60, contextRisk: 55, overallRisk: 50 },
      { time: 5, voiceAuthenticity: 38, speakerMatch: 35, conversationRisk: 70, contextRisk: 65, overallRisk: 58 },
      { time: 10, voiceAuthenticity: 25, speakerMatch: 20, conversationRisk: 80, contextRisk: 75, overallRisk: 70 },
      { time: 15, voiceAuthenticity: 15, speakerMatch: 10, conversationRisk: 85, contextRisk: 85, overallRisk: 85 },
    ],
  },
  {
    id: 'replay',
    name: 'Replay Attack',
    description: 'Recorded voice replayed to simulate legitimate caller',
    color: 'vs-amber',
    events: [
      { time: 0, voiceAuthenticity: 75, speakerMatch: 78, conversationRisk: 35, contextRisk: 40, overallRisk: 32 },
      { time: 5, voiceAuthenticity: 72, speakerMatch: 75, conversationRisk: 42, contextRisk: 48, overallRisk: 42 },
      { time: 10, voiceAuthenticity: 68, speakerMatch: 70, conversationRisk: 52, contextRisk: 58, overallRisk: 52 },
      { time: 15, voiceAuthenticity: 65, speakerMatch: 65, conversationRisk: 60, contextRisk: 65, overallRisk: 62 },
    ],
  },
  {
    id: 'voice-conversion',
    name: 'Voice Conversion Attack',
    description: 'Voice conversion model mimicking trusted contact',
    color: 'vs-red',
    events: [
      { time: 0, voiceAuthenticity: 70, speakerMatch: 72, conversationRisk: 45, contextRisk: 50, overallRisk: 42 },
      { time: 5, voiceAuthenticity: 60, speakerMatch: 58, conversationRisk: 55, contextRisk: 60, overallRisk: 55 },
      { time: 10, voiceAuthenticity: 48, speakerMatch: 42, conversationRisk: 68, contextRisk: 72, overallRisk: 70 },
      { time: 15, voiceAuthenticity: 35, speakerMatch: 28, conversationRisk: 78, contextRisk: 82, overallRisk: 82 },
    ],
  },
  {
    id: 'social-engineering',
    name: 'Social Engineering Script',
    description: 'Legitimate voice but social engineering tactics',
    color: 'vs-amber',
    events: [
      { time: 0, voiceAuthenticity: 85, speakerMatch: 20, conversationRisk: 70, contextRisk: 65, overallRisk: 60 },
      { time: 5, voiceAuthenticity: 83, speakerMatch: 15, conversationRisk: 75, contextRisk: 72, overallRisk: 68 },
      { time: 10, voiceAuthenticity: 80, speakerMatch: 10, conversationRisk: 82, contextRisk: 78, overallRisk: 75 },
      { time: 15, voiceAuthenticity: 78, speakerMatch: 5, conversationRisk: 88, contextRisk: 85, overallRisk: 82 },
    ],
  },
]

// Mock evidence signals
export const MOCK_EVIDENCE = {
  genuine: [
    'Voice characteristics match trusted contact profile',
    'Speaking patterns consistent with known communication style',
    'Natural conversational flow detected',
    'Call context aligns with expected caller',
  ],
  synthetic: [
    'Voice shows signs of synthetic generation',
    'Detected high-frequency anomalies typical of AI models',
    'Unnatural prosody patterns detected',
    'Speaker profile does not match trusted contacts',
  ],
  replay: [
    'Repetitive pattern segments detected',
    'Acoustic anomalies suggest recorded audio',
    'Unusual pauses and timing inconsistencies',
    'No speaker enrollment match found',
  ],
  voiceConversion: [
    'Voice characteristics show conversion artifacts',
    'Subtle mismatches in speaker identity features',
    'Unnatural emotion and intonation patterns',
    'Mismatch with known communication style',
  ],
  socialEngineering: [
    'Caller requesting sensitive information (OTP, password)',
    'Unusual urgency or pressure in conversation',
    'Request for verification of existing account details',
    'Caller claiming system issues requiring immediate action',
  ],
}

// Mock trusted contacts
export const MOCK_CONTACTS = [
  {
    id: 1,
    name: 'Mom',
    phone: '+1-555-0101',
    enrolledDate: '2024-01-15',
    voiceSampleId: 'sample_001',
  },
  {
    id: 2,
    name: 'Bank Support',
    phone: '+1-800-MYBANK',
    enrolledDate: '2024-02-20',
    voiceSampleId: 'sample_002',
  },
  {
    id: 3,
    name: 'Doctor',
    phone: '+1-555-0303',
    enrolledDate: '2024-03-10',
    voiceSampleId: 'sample_003',
  },
]

// Mock incident history
export const MOCK_INCIDENTS = [
  {
    id: 'incident_001',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    riskLevel: 'high',
    callDetails: {
      callerId: 'Unknown',
      callerNumber: '+1-555-9999',
      callDuration: '3m 22s',
      callTime: '14:35',
    },
    events: [
      { voiceAuthenticity: 35, speakerMatch: 25, conversationRisk: 82, contextRisk: 80, overallRisk: 70 },
      { voiceAuthenticity: 28, speakerMatch: 20, conversationRisk: 88, contextRisk: 85, overallRisk: 80 },
      { voiceAuthenticity: 20, speakerMatch: 15, conversationRisk: 92, contextRisk: 90, overallRisk: 88 },
    ],
    timeline: [
      { time: '14:35', label: 'Call received', severity: 'low', description: 'Incoming call from unknown number' },
      { time: '14:36', label: 'Analysis started', severity: 'low', description: 'Voice analysis in progress' },
      { time: '14:37', label: 'OTP request', severity: 'high', description: 'Caller asked for one-time password' },
      { time: '14:38', label: 'Alert triggered', severity: 'high', description: 'High risk detected - verification requested' },
      { time: '14:40', label: 'Call ended', severity: 'low', description: 'User ended call' },
    ],
    recommendedAction: 'Do not share sensitive information',
    verificationResult: 'not_requested',
    evidence: [
      'Voice shows signs of synthetic generation',
      'Speaker profile does not match any trusted contacts',
      'Caller requested OTP',
      'Unusual conversation patterns detected',
    ],
  },
  {
    id: 'incident_002',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    riskLevel: 'low',
    callDetails: {
      callerId: 'Mom',
      callerNumber: '+1-555-0101',
      callDuration: '8m 15s',
      callTime: '19:45',
    },
    events: [
      { voiceAuthenticity: 92, speakerMatch: 95, conversationRisk: 15, contextRisk: 10, overallRisk: 8 },
    ],
    timeline: [
      { time: '19:45', label: 'Call received', severity: 'low', description: 'Incoming call from trusted contact' },
      { time: '19:46', label: 'Identity verified', severity: 'low', description: 'Matched with enrollment profile' },
      { time: '19:54', label: 'Call ended', severity: 'low', description: 'Normal call completion' },
    ],
    recommendedAction: 'Call verified as legitimate',
    verificationResult: 'verified',
    evidence: [
      'Voice characteristics match trusted contact profile',
      'Speaking patterns consistent with known communication style',
      'Natural conversational flow detected',
    ],
  },
  {
    id: 'incident_003',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    riskLevel: 'medium',
    callDetails: {
      callerId: 'Unknown',
      callerNumber: '+1-555-8888',
      callDuration: '2m 45s',
      callTime: '11:20',
    },
    events: [
      { voiceAuthenticity: 70, speakerMatch: 65, conversationRisk: 50, contextRisk: 55, overallRisk: 58 },
      { voiceAuthenticity: 65, speakerMatch: 60, conversationRisk: 60, contextRisk: 65, overallRisk: 68 },
    ],
    timeline: [
      { time: '11:20', label: 'Call received', severity: 'low', description: 'Incoming call from unknown' },
      { time: '11:21', label: 'Analysis in progress', severity: 'medium', description: 'Suspicious patterns detected' },
      { time: '11:23', label: 'Call ended', severity: 'low', description: 'User ended call' },
    ],
    recommendedAction: 'Exercise caution with this caller',
    verificationResult: 'pending',
    evidence: [
      'Speaker profile does not match enrolled contacts',
      'Unusual conversation patterns',
      'Potential voice conversion artifacts detected',
    ],
  },
]

// WebSocket event simulator
export function generateRiskEvent() {
  return {
    timestamp: new Date().toISOString(),
    voiceAuthenticity: Math.max(0, Math.min(100, 50 + Math.random() * 50 - 25)),
    speakerMatch: Math.max(0, Math.min(100, 50 + Math.random() * 50 - 25)),
    conversationRisk: Math.max(0, Math.min(100, 50 + Math.random() * 50 - 25)),
    contextRisk: Math.max(0, Math.min(100, 50 + Math.random() * 50 - 25)),
    overallRisk: 0, // Will be calculated
    riskLevel: 'medium',
    evidence: [],
  }
}
