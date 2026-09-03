import { useEffect, useState } from 'react'
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts'

export default function LiveWaveform() {
  const [data, setData] = useState(Array.from({ length: 40 }, (_, i) => ({ id: i, value: Math.random() * 100 })))

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)]
        newData.push({ id: prevData.length, value: Math.random() * 100 })
        return newData
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full">
      <div className="h-24 bg-vs-dark rounded-lg p-2 border border-gray-700/50 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Bar dataKey="value" fill="none" radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => {
                const intensity = entry.value / 100
                const hue = intensity > 0.7 ? '#dc2626' : intensity > 0.4 ? '#f59e0b' : '#06b6d4'
                return <Cell key={`cell-${index}`} fill={hue} />
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
        <span>Audio waveform (real-time)</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-vs-cyan animate-pulse"></div>
          <span>Listening...</span>
        </div>
      </div>
    </div>
  )
}
