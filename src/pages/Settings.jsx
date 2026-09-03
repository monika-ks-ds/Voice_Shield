import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components'
import { Eye, EyeOff, Trash2, Check, Settings as SettingsIcon, Lock, Bell, Globe } from 'lucide-react'

export default function Settings({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('privacy')
  const [dataRetention, setDataRetention] = useState(30)
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  const handleDeleteData = () => {
    alert('All voice data has been deleted')
    setShowDeleteConfirm(false)
  }

  const tabs = [
    { id: 'privacy', label: 'Privacy & Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'account', label: 'Account', icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-vs-darker">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account, privacy, and preferences</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeTab === tab.id
                      ? 'bg-vs-red/20 text-vs-red'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {/* Privacy & Security Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Privacy & Security</h2>

                  {/* Data Retention */}
                  <div className="mb-8 pb-8 border-b border-gray-700/50">
                    <h3 className="font-semibold text-white mb-3">Data Retention</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Automatically delete old voice samples after:
                    </p>
                    <select
                      value={dataRetention}
                      onChange={(e) => setDataRetention(Number(e.target.value))}
                      className="input-field w-full md:w-48"
                    >
                      <option value={7}>7 days</option>
                      <option value={30}>30 days</option>
                      <option value={90}>90 days</option>
                      <option value={365}>1 year</option>
                      <option value={0}>Never (manual only)</option>
                    </select>
                  </div>

                  {/* Delete Data */}
                  <div className="mb-8 pb-8 border-b border-gray-700/50">
                    <h3 className="font-semibold text-white mb-3">Delete My Data</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Permanently delete all voice samples, enrollment data, and incident history.
                      This action cannot be undone.
                    </p>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-vs-red/20 text-vs-red hover:bg-vs-red hover:text-white rounded-lg font-semibold transition-all"
                    >
                      <Trash2 size={18} />
                      Delete All Data
                    </button>
                  </div>

                  {/* Delete Confirmation Modal */}
                  {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-vs-dark border-2 border-vs-red rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-xl font-bold text-vs-red mb-3">Confirm Data Deletion</h3>
                        <p className="text-gray-300 mb-6">
                          Are you sure you want to delete all your voice data? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={handleDeleteData}
                            className="flex-1 btn-primary"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(false)}
                            className="flex-1 btn-ghost"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Encryption Info */}
                  <div className="bg-vs-navy/10 border border-vs-navy/30 rounded-lg p-4">
                    <p className="text-sm text-gray-300">
                      ✓ All voice data is encrypted end-to-end. Raw audio is never logged or transmitted without your explicit consent.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Notification Settings</h2>

                  <div className="space-y-4">
                    {[
                      {
                        title: 'High Risk Alerts',
                        description: 'Get notified when a call is detected as high risk',
                        enabled: alertsEnabled,
                      },
                      {
                        title: 'Suspicious Activity',
                        description: 'Alerts for medium risk and suspicious patterns',
                        enabled: true,
                      },
                      {
                        title: 'New Enrollments',
                        description: 'Notify when a new contact is successfully enrolled',
                        enabled: true,
                      },
                      {
                        title: 'Weekly Report',
                        description: 'Receive a summary of your call activity and statistics',
                        enabled: false,
                      },
                    ].map((notif, index) => (
                      <div key={index} className="flex items-start justify-between p-4 bg-vs-dark/50 rounded-lg border border-gray-700/50">
                        <div>
                          <h4 className="font-semibold text-white">{notif.title}</h4>
                          <p className="text-sm text-gray-400 mt-1">{notif.description}</p>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={notif.enabled}
                            className="w-4 h-4 rounded bg-vs-dark border-gray-700"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">User Preferences</h2>

                  {/* Language */}
                  <div className="mb-8 pb-8 border-b border-gray-700/50">
                    <h3 className="font-semibold text-white mb-3">Language</h3>
                    <select className="input-field w-full md:w-48">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Hindi</option>
                    </select>
                  </div>

                  {/* Theme */}
                  <div className="mb-8 pb-8 border-b border-gray-700/50">
                    <h3 className="font-semibold text-white mb-3">Theme</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Dark', value: 'dark', icon: '🌙' },
                        { name: 'Light', value: 'light', icon: '☀️' },
                        { name: 'Auto', value: 'auto', icon: '🔄' },
                      ].map((theme) => (
                        <label key={theme.value} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-vs-dark/50 transition-colors">
                          <input
                            type="radio"
                            name="theme"
                            defaultChecked={theme.value === 'dark'}
                            className="w-4 h-4"
                          />
                          <span>{theme.icon}</span>
                          <span className="text-white font-medium">{theme.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Risk Sensitivity */}
                  <div>
                    <h3 className="font-semibold text-white mb-3">Alert Sensitivity</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Adjust how aggressively Voice-Shield flags calls as risky:
                    </p>
                    <select className="input-field w-full md:w-48">
                      <option>Low (only highest risk)</option>
                      <option>Medium (balanced)</option>
                      <option>High (very sensitive)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div className="card p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Account Information</h2>

                  {/* Profile */}
                  <div className="mb-8 pb-8 border-b border-gray-700/50">
                    <h3 className="font-semibold text-white mb-4">Profile</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                        <input
                          type="text"
                          defaultValue={user?.name}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={user?.email}
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="mb-8 pb-8 border-b border-gray-700/50">
                    <h3 className="font-semibold text-white mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="input-field"
                        />
                      </div>
                      <button className="btn-primary">Update Password</button>
                    </div>
                  </div>

                  {/* Logout */}
                  <div>
                    <h3 className="font-semibold text-white mb-3">Session</h3>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
