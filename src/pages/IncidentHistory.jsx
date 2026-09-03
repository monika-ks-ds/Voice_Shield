import { useState } from 'react'
import { Header, IncidentListItem } from '../components'
import { Search, Filter } from 'lucide-react'
import { MOCK_INCIDENTS } from '../lib/mockData'

export default function IncidentHistory({ user }) {
  const [incidents, setIncidents] = useState(MOCK_INCIDENTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRisk, setFilterRisk] = useState('all')

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch = incident.callDetails.callerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          incident.callDetails.callerNumber.includes(searchTerm)
    const matchesRisk = filterRisk === 'all' || incident.riskLevel === filterRisk

    return matchesSearch && matchesRisk
  })

  return (
    <div className="min-h-screen bg-vs-darker">
      <Header user={user} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Incident History</h1>
          <p className="text-gray-400">
            Review all monitored calls and incidents. Analyze patterns and verify outcomes.
          </p>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-3.5 text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or phone..."
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Risk Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Risk Level</label>
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="input-field cursor-pointer"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-400">
            Showing <span className="font-semibold text-white">{filteredIncidents.length}</span> incidents
          </p>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white">
            <Filter size={18} />
            Advanced Filter
          </button>
        </div>

        {/* Incidents List */}
        {filteredIncidents.length > 0 ? (
          <div>
            {filteredIncidents.map((incident) => (
              <IncidentListItem key={incident.id} incident={incident} />
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <p className="text-gray-400 text-lg">No incidents found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  )
}
