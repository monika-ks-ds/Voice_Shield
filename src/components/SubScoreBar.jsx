import { useEffect, useState } from 'react'

export default function SubScoreBar({ label, value = 0, icon: Icon }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValue((prev) => {
        if (prev < value) {
          return Math.min(prev + 1.5, value)
        } else if (prev > value) {
          return Math.max(prev - 1.5, value)
        }
        return prev
      })
    }, 30)

    return () => clearInterval(interval)
  }, [value])

  const getStatusColor = () => {
    if (displayValue < 33) return { bg: 'bg-vs-green', dot: 'bg-vs-green' }
    if (displayValue < 67) return { bg: 'bg-vs-amber', dot: 'bg-vs-amber' }
    return { bg: 'bg-vs-red', dot: 'bg-vs-red' }
  }

  const colors = getStatusColor()

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={18} className="text-vs-cyan" />}
          <span className="text-sm font-medium text-gray-300">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`}></div>
          <span className="text-sm font-semibold text-white">{Math.round(displayValue)}%</span>
        </div>
      </div>
      <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors.bg} transition-all duration-200 rounded-full`}
          style={{ width: `${displayValue}%` }}
        ></div>
      </div>
    </div>
  )
}
