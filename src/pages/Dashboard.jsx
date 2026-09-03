import { Link } from 'react-router-dom'
import { Header } from '../components'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { PhoneOff, Shield, AlertTriangle, TrendingUp } from 'lucide-react'

export default function Dashboard({ user }) {
  // Mock data for charts
  const callsData = [
    { day: 'Mon', total: 24, risky: 3 },
    { day: 'Tue', total: 18, risky: 2 },
    { day: 'Wed', total: 31, risky: 5 },
    { day: 'Thu', total: 27, risky: 4 },
    { day: 'Fri', total: 22, risky: 2 },
    { day: 'Sat', total: 15, risky: 1 },
    { day: 'Sun', total: 19, risky: 3 },
  ]

  const riskTrendData = [
    { week: 'Week 1', avgRisk: 28 },
    { week: 'Week 2', avgRisk: 32 },
    { week: 'Week 3', avgRisk: 25 },
    { week: 'Week 4', avgRisk: 21 },
  ]

  const stats = [
    {
      icon: PhoneOff,
      label: 'Calls Monitored',
      value: '156',
      change: '+12%',
      color: 'text-vs-cyan',
    },
    {
      icon: AlertTriangle,
      label: 'Risky Calls',
      value: '20',
      change: '-8%',
      color: 'text-vs-amber',
    },
    {
      icon: Shield,
      label: 'Verified Safe',
      value: '136',
      change: '+15%',
      color: 'text-vs-green',
    },
    {
      icon: TrendingUp,
      label: 'Protection Rate',
      value: '87.2%',
      change: '+3%',
      color: 'text-vs-red',
    },
  ]

  return (
    <div className="min-h-screen bg-vs-darker">
      <Header user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-400">
            Here's your Voice-Shield protection summary and activity overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="card p-6 hover:border-vs-red/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <stat.icon className={`${stat.color}`} size={24} />
              </div>
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className={`text-xs ${stat.change.startsWith('+') ? 'text-vs-green' : 'text-vs-red'} mt-2`}>
                {stat.change} from last month
              </p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Calls Chart */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Weekly Call Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={callsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="total" fill="#06b6d4" name="Total Calls" radius={[8, 8, 0, 0]} />
                <Bar dataKey="risky" fill="#dc2626" name="Risky Calls" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Trend Chart */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Risk Trend (4 Weeks)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={riskTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avgRisk"
                  stroke="#dc2626"
                  name="Avg Risk Score"
                  dot={{ fill: '#dc2626', r: 6 }}
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/enroll"
            className="card p-6 hover:border-vs-red/50 hover:shadow-glow-red transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-vs-red to-vs-navy rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-xl">👤</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Manage Contacts</h3>
            <p className="text-sm text-gray-400">Add or remove trusted voice contacts</p>
          </Link>

          <Link
            to="/incidents"
            className="card p-6 hover:border-vs-red/50 hover:shadow-glow-red transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-vs-red to-vs-navy rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-xl">📋</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Incident History</h3>
            <p className="text-sm text-gray-400">Review past calls and incidents</p>
          </Link>

          <Link
            to="/attack-lab"
            className="card p-6 hover:border-vs-red/50 hover:shadow-glow-red transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-vs-red to-vs-navy rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-xl">🔬</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Attack Lab</h3>
            <p className="text-sm text-gray-400">Test various attack scenarios</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 card p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              {
                time: '2 hours ago',
                event: 'Call monitored from Mom',
                risk: 'LOW',
                icon: '✓',
                color: 'text-vs-green',
              },
              {
                time: '4 hours ago',
                event: 'Risky call detected - High risk score',
                risk: 'HIGH',
                icon: '⚠️',
                color: 'text-vs-red',
              },
              {
                time: '6 hours ago',
                event: 'New trusted contact enrolled',
                risk: 'INFO',
                icon: '🎤',
                color: 'text-vs-cyan',
              },
              {
                time: '1 day ago',
                event: 'Voice settings updated',
                risk: 'INFO',
                icon: '⚙️',
                color: 'text-vs-cyan',
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-vs-dark/50 rounded-lg">
                <div className={`text-2xl ${item.color}`}>{item.icon}</div>
                <div className="flex-1">
                  <p className="text-white font-medium">{item.event}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.risk === 'LOW' ? 'badge-low' :
                  item.risk === 'HIGH' ? 'badge-high' :
                  'bg-vs-cyan/20 text-vs-cyan'
                }`}>
                  {item.risk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
