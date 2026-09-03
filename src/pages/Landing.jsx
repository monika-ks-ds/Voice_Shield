import { Link } from 'react-router-dom'
import { Shield, Zap, Lock, Users, TrendingUp, ChevronRight } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-vs-darker">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-40 bg-vs-dark/80 backdrop-blur-md border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-vs-red to-vs-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">VS</span>
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-vs-red to-vs-navy">
              Voice-Shield
            </span>
          </div>
          <Link to="/login" className="btn-primary">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-vs-navy/20 border border-vs-navy/50 rounded-full mb-6">
            <Zap size={16} className="text-vs-red" />
            <span className="text-sm font-semibold text-vs-cyan">AI-Powered Protection</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Safer Voices.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vs-red to-vs-navy">
              A More Trusted Tomorrow.
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-8">
            Voice-Shield analyzes live phone calls in real time to detect voice cloning, impersonation, and scam attempts.
            Protect yourself with intelligent identity verification before taking sensitive actions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="btn-primary flex items-center justify-center gap-2">
              Start Protecting Now
              <ChevronRight size={20} />
            </Link>
            <button className="btn-ghost">Watch Demo</button>
          </div>
        </div>
      </section>

      {/* Privacy Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-vs-navy/10 border border-vs-navy/30 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock size={20} className="text-vs-cyan" />
            <span className="font-semibold text-white">Your Privacy is Protected</span>
          </div>
          <p className="text-gray-400 text-sm">
            Audio is processed securely. No raw audio is stored without explicit consent. All analysis happens with your control.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-vs-dark/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">Why Voice-Shield?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Real-Time Detection',
                description: 'Analyze calls instantly as they happen. Get risk scores and evidence in real time.',
              },
              {
                icon: TrendingUp,
                title: 'Explainable AI',
                description: 'See exactly why a call is flagged as risky. Plain-language evidence you can understand.',
              },
              {
                icon: Users,
                title: 'Trusted Contact Management',
                description: 'Enroll voice samples from trusted contacts. System learns to recognize legitimate callers.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="card p-8 hover:border-vs-red/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-vs-red to-vs-navy rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">How It Works</h2>

          <div className="space-y-12">
            {[
              { step: '01', title: 'Incoming Call', desc: 'A call arrives. Voice-Shield starts analyzing immediately.' },
              { step: '02', title: 'Analysis', desc: 'Multiple AI models assess voice authenticity, speaker match, and conversation risk.' },
              { step: '03', title: 'Risk Scoring', desc: 'A comprehensive risk score is calculated and displayed in real time.' },
              { step: '04', title: 'Alert & Verify', desc: 'If risk is high, you get an alert with actionable verification options.' },
              { step: '05', title: 'Protection', desc: 'Make informed decisions about sensitive actions on verified calls.' },
            ].map((item, index) => (
              <div key={index} className="flex gap-8 items-center">
                <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-vs-red to-vs-navy rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-vs-red/10 to-vs-navy/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '99.2%', label: 'Detection Accuracy' },
              { number: '< 2s', label: 'Analysis Latency' },
              { number: '10M+', label: 'Calls Protected' },
              { number: '5 Years', label: 'Industry Experience' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-vs-red to-vs-navy mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Protect Your Calls?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of users who trust Voice-Shield to keep their voices and data safe.
          </p>
          <Link to="/login" className="btn-primary inline-flex items-center gap-2">
            Get Started Now
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-vs-red to-vs-navy rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VS</span>
                </div>
                <span className="font-bold text-white">Voice-Shield</span>
              </div>
              <p className="text-gray-400 text-sm">Safer Voices. A More Trusted Tomorrow.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700/50 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Voice-Shield. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
