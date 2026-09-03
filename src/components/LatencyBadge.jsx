import { Zap } from 'lucide-react'

export default function LatencyBadge({ latency = 1.2 }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-vs-navy/30 border border-vs-cyan/30 text-vs-cyan rounded-full text-xs font-semibold">
      <Zap size={12} className="animate-pulse" />
      <span>{"< " + latency.toFixed(1)}s analysis</span>
    </div>
  )
}
