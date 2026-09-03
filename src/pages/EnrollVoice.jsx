import { useState } from 'react'
import { Header } from '../components'
import { Mic, Check, Plus, X, AlertCircle } from 'lucide-react'
import { MOCK_CONTACTS } from '../lib/mockData'

export default function EnrollVoice({ user }) {
  const [contacts, setContacts] = useState(MOCK_CONTACTS)
  const [recording, setRecording] = useState(false)
  const [newContact, setNewContact] = useState({ name: '', phone: '' })
  const [showAddForm, setShowAddForm] = useState(false)
  const [consent, setConsent] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  const startRecording = () => {
    setRecording(true)
    setRecordingTime(0)
    const interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)

    setTimeout(() => {
      clearInterval(interval)
      setRecording(false)
    }, 8000)
  }

  const handleAddContact = (e) => {
    e.preventDefault()
    if (newContact.name && newContact.phone && consent) {
      const contact = {
        id: contacts.length + 1,
        ...newContact,
        enrolledDate: new Date().toISOString().split('T')[0],
        voiceSampleId: `sample_${Math.random().toString(36).substr(2, 9)}`,
      }
      setContacts([...contacts, contact])
      setNewContact({ name: '', phone: '' })
      setShowAddForm(false)
      setConsent(false)
    }
  }

  const removeContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-vs-darker">
      <Header user={user} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Trusted Contact Enrollment</h1>
          <p className="text-gray-400">
            Record and enroll voice samples from trusted contacts. This helps Voice-Shield recognize legitimate callers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Enrollment Form */}
          <div className="md:col-span-2">
            <div className="card p-8 mb-8">
              <h2 className="text-xl font-semibold text-white mb-6">Enroll a New Contact</h2>

              {!showAddForm ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center justify-center gap-2 w-full px-6 py-12 border-2 border-dashed border-vs-red/50 rounded-lg hover:border-vs-red hover:bg-vs-red/5 transition-all"
                >
                  <Plus size={24} className="text-vs-red" />
                  <span className="text-lg font-semibold text-vs-red">Add New Contact</span>
                </button>
              ) : (
                <form onSubmit={handleAddContact} className="space-y-4">
                  {/* Contact Info */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Contact Name</label>
                    <input
                      type="text"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      placeholder="e.g., Mom, Bank Support, Doctor"
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      placeholder="+1-555-0000"
                      className="input-field"
                      required
                    />
                  </div>

                  {/* Recording Section */}
                  <div className="border border-gray-700 rounded-lg p-6 text-center">
                    <p className="text-sm font-medium text-gray-300 mb-4">Record a Voice Sample</p>
                    <p className="text-xs text-gray-400 mb-6">
                      Click the button below and speak for 5-8 seconds. Say something natural like "Hi, this is [name] calling."
                    </p>

                    {recording ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-vs-red/20 rounded-full flex items-center justify-center animate-pulse">
                          <Mic className="text-vs-red" size={32} />
                        </div>
                        <div className="text-2xl font-bold text-vs-red">{recordingTime}s</div>
                        <p className="text-sm text-gray-400">Recording in progress...</p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={startRecording}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-vs-red hover:bg-vs-red-dark text-white rounded-lg font-semibold transition-all"
                      >
                        <Mic size={20} />
                        Start Recording
                      </button>
                    )}
                  </div>

                  {/* Consent */}
                  <div className="bg-vs-navy/10 border border-vs-navy/30 rounded-lg p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded bg-vs-dark border-gray-700"
                      />
                      <span className="text-sm text-gray-300">
                        I understand that my voice sample will be securely stored and used only to identify calls from this contact. No raw audio is shared without consent.
                      </span>
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={!consent}
                      className={`flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <Check size={20} />
                      Enroll Contact
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false)
                        setNewContact({ name: '', phone: '' })
                        setConsent(false)
                      }}
                      className="flex-1 btn-ghost"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div className="md:col-span-1">
            <div className="card p-6 bg-vs-navy/10 border-vs-navy/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-vs-cyan" />
                Privacy First
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                Voice-Shield stores voice samples securely on your device and in encrypted cloud storage.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-vs-green mt-0.5 flex-shrink-0" />
                  <span>End-to-end encryption</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-vs-green mt-0.5 flex-shrink-0" />
                  <span>No raw audio logging</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-vs-green mt-0.5 flex-shrink-0" />
                  <span>You control retention</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-vs-green mt-0.5 flex-shrink-0" />
                  <span>Delete anytime</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Enrolled Contacts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Your Enrolled Contacts</h2>

          {contacts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="card p-6 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-vs-red/50 to-vs-navy/50 rounded-lg flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <button
                      onClick={() => removeContact(contact.id)}
                      className="p-2 opacity-0 group-hover:opacity-100 hover:bg-vs-red/20 rounded-lg transition-all"
                    >
                      <X size={16} className="text-vs-red" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{contact.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{contact.phone}</p>
                  <p className="text-xs text-gray-500">
                    Enrolled: {new Date(contact.enrolledDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <p className="text-gray-400">No enrolled contacts yet.</p>
              <p className="text-gray-500 text-sm mt-2">Add your first trusted contact to get started.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
