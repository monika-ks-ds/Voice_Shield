import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LogOut, Settings as SettingsIcon } from 'lucide-react'
import { useState } from 'react'

export default function Header({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/call', label: 'Live Call' },
    { path: '/incidents', label: 'History' },
    { path: '/attack-lab', label: 'Attack Lab' },
  ]

  return (
    <header className="bg-vs-dark border-b border-gray-700/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-vs-red to-vs-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">VS</span>
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-vs-red to-vs-navy">
              Voice-Shield
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-vs-red'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Info & Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            )}
            <Link to="/settings" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <SettingsIcon size={20} className="text-gray-400 hover:text-white" />
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm font-medium"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700/50 py-4">
            <nav className="space-y-2 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-vs-red/20 text-vs-red'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-gray-700/50 pt-4 space-y-2">
              <Link
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                Settings
              </Link>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
