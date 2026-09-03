import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function Login({ onLogin, isAuthenticated }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard')
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Mock login - accept any email/password combination
        const userData = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0],
          email: email,
          avatar: '👤',
        }
        onLogin(userData)
        navigate('/dashboard')
      } else {
        setError('Please fill in all fields')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vs-darker via-vs-navy/20 to-vs-red/10 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-vs-red to-vs-navy rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">VS</span>
          </div>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-vs-red to-vs-navy">
            Voice-Shield
          </span>
        </Link>

        {/* Card */}
        <div className="card p-8 mb-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm mb-6">
            Sign in to access your Voice-Shield dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3.5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3.5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-vs-red/20 border border-vs-red/50 rounded-lg p-3 text-vs-red-light text-sm">
                {error}
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded bg-vs-dark border-gray-700" />
                Remember me
              </label>
              <a href="#" className="text-vs-cyan hover:text-vs-cyan/80 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`btn-primary w-full font-semibold ${loading ? 'opacity-75' : ''}`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Sign Up Link */}
        <div className="text-center text-gray-400">
          Don't have an account?{' '}
          <a href="#" className="text-vs-red hover:text-vs-red-light transition-colors font-semibold">
            Sign up
          </a>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 bg-vs-navy/20 border border-vs-navy/50 rounded-lg p-4">
          <p className="text-xs font-semibold text-vs-cyan mb-2">Demo Credentials</p>
          <p className="text-xs text-gray-400 mb-1">Email: <span className="text-white font-mono">demo@voiceshield.io</span></p>
          <p className="text-xs text-gray-400">Password: <span className="text-white font-mono">demo123</span></p>
          <p className="text-xs text-gray-500 mt-2">Any email/password combination works in demo mode</p>
        </div>
      </div>
    </div>
  )
}
