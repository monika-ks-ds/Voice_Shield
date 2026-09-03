import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from 'react'

export default function RiskGauge({ score = 0, animated = true }) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score)
      return
    }

    const interval = setInterval(() => {
      setDisplayScore((prev) => {
        if (prev < score) {
          return Math.min(prev + 2, score)
        } else if (prev > score) {
          return Math.max(prev - 2, score)
        }
        return prev
      })
    }, 30)

    return () => clearInterval(interval)
  }, [score, animated])

  const getRiskLevel = () => {
    if (displayScore < 33) return { level: 'LOW RISK', color: '#10b981' }
    if (displayScore < 67) return { level: 'MEDIUM RISK', color: '#f59e0b' }
    return { level: 'HIGH RISK', color: '#dc2626' }
  }

  const risk = getRiskLevel()
  const data = [
    { name: 'risk', value: displayScore },
    { name: 'safe', value: 100 - displayScore },
  ]

  const colors = [risk.color, '#1f2937']

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-64 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={0}
              dataKey="value"
            >
              {colors.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold" style={{ color: risk.color }}>
            {displayScore}
          </div>
          <div className="text-sm text-gray-400 mt-2">out of 100</div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <div className="text-lg font-semibold" style={{ color: risk.color }}>
          {risk.level}
        </div>
        <div className="text-xs text-gray-400 mt-1 max-w-xs">
          {displayScore < 33 && "This call appears to be from a legitimate source"}
          {displayScore >= 33 && displayScore < 67 && "Exercise caution - verify caller identity before sharing sensitive information"}
          {displayScore >= 67 && "High risk detected - do not share sensitive information or take financial actions"}
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-vs-green"></div>
          <span className="text-xs text-gray-400">Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-vs-amber"></div>
          <span className="text-xs text-gray-400">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-vs-red"></div>
          <span className="text-xs text-gray-400">High</span>
        </div>
      </div>
    </div>
  )
}
