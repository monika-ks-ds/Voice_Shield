export default function IncidentTimeline({ events = [] }) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-white mb-4">Call Timeline</h3>
      <div className="space-y-4">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${
                  event.severity === 'high' ? 'bg-vs-red' :
                  event.severity === 'medium' ? 'bg-vs-amber' :
                  'bg-vs-green'
                }`}></div>
                {index < events.length - 1 && (
                  <div className="w-0.5 h-12 bg-gray-700/50 my-2"></div>
                )}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-semibold text-white">{event.label}</p>
                  <span className="text-xs text-gray-400">{event.time}</span>
                </div>
                {event.description && (
                  <p className="text-xs text-gray-400 mt-1">{event.description}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 text-center py-4">No events recorded</p>
        )}
      </div>
    </div>
  )
}
