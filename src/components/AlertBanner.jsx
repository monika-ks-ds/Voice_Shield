import { AlertTriangle, Shield, X } from 'lucide-react'
import { useState } from 'react'

export default function AlertBanner({ visible = true, onClose, onVerify, onEndCall }) {
  const [dismissed, setDismissed] = useState(!visible)

  const handleDismiss = () => {
    setDismissed(true)
    onClose?.()
  }

  if (dismissed) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md bg-gradient-to-br from-vs-red/10 to-vs-red/5 border-2 border-vs-red rounded-xl p-6 shadow-2xl shadow-vs-red/50 animate-scale-in">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-vs-red/20 rounded-lg flex-shrink-0 animate-pulse">
            <AlertTriangle className="text-vs-red-light" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-vs-red-light mb-2">Potential Impersonation Detected</h2>
            <p className="text-sm text-gray-300 mb-4">
              This call shows multiple signs of risk. We recommend verifying the caller's identity before sharing any sensitive information or taking financial actions.
            </p>
            <div className="bg-vs-red/10 border border-vs-red/30 rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-200 font-medium">⚠️ Do not:</p>
              <ul className="text-xs text-gray-300 mt-2 space-y-1">
                <li>• Share passwords or PINs</li>
                <li>• Confirm banking details</li>
                <li>• Send money or verify payment information</li>
                <li>• Share one-time passwords (OTP)</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onVerify}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <Shield size={18} />
                Verify Identity
              </button>
              <button
                onClick={onEndCall}
                className="flex-1 btn-ghost"
              >
                End Call
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
