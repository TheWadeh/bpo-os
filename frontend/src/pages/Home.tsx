import { Link } from 'react-router-dom'
import DashboardPreview from '../components/DashboardPreview'

export default function Home() {
  return (
    <div className="">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-blue text-text-white">
        {/* Glow background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[28%] h-[520px] w-[1200px] -translate-x-1/2 rounded-full opacity-50 blur-3xl" style={{ background: 'radial-gradient(closest-side, rgba(72,181,255,0.25), transparent 70%)' }} />
          <div className="absolute right-[10%] top-[55%] h-[280px] w-[480px] rounded-full opacity-40 blur-2xl" style={{ background: 'radial-gradient(closest-side, rgba(162,255,69,0.25), transparent 70%)' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-navy-blue-light px-3 py-1 text-xs font-medium text-neon-green ring-1 ring-inset ring-soft-cyan/40">
              NEW
              <span className="ml-2 text-text-light-gray">BPO OS AI is now available</span>
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-text-white sm:text-5xl md:text-6xl">
              All‑in‑one platform to simplify your business workflow
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-text-light-gray">
              Harness AI for seamless project management, job operations, and team collaboration — tailored for growing BPOs.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/register"
                className="btn-primary"
              >
                Try BPO OS for Free
              </Link>
              <Link
                to="/about"
                className="btn-secondary"
              >
                Schedule a Demo
              </Link>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="mt-12">
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* Logos row */}
      <section className="bg-navy-blue py-10 text-text-light-gray">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-70">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="h-6 w-28 rounded bg-white/5" />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-navy-blue pb-24 pt-6 text-text-light-gray">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-navy-blue-light px-3 py-1 text-xs font-medium text-text-light-gray ring-1 ring-inset ring-white/10">
              Features
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-text-white sm:text-4xl">
              Powerful features for enhanced productivity
            </h2>
            <p className="mt-4 text-text-light-gray">
              Discover the tools that take your business workflow to the next level.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="card-base">
              <h3 className="text-lg font-semibold text-text-white">Automate Workflow & Tasks</h3>
              <p className="mt-2 text-sm text-text-light-gray">
                Build automations in seconds and let AI handle the heavy lifting. Keep your team focused on what matters most.
              </p>
              <div className="mt-6 h-64 rounded-xl bg-navy-blue ring-1 ring-white/10" />
            </div>
            <div className="card-base">
              <h3 className="text-lg font-semibold text-text-white">Smart Communication</h3>
              <p className="mt-2 text-sm text-text-light-gray">
                Collaborate seamlessly with integrated messaging and conferencing powered by AI assistance.
              </p>
              <div className="mt-6 h-64 rounded-xl bg-navy-blue ring-1 ring-white/10" />
            </div>
          </div>

          {/* Secondary CTAs */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/jobs"
              className="btn-primary"
            >
              Browse Jobs
            </Link>
            <Link
              to="/bposchool"
              className="btn-secondary"
            >
              Learn in BPO School
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

