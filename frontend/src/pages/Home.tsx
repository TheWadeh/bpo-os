import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b0f13] text-gray-200">
        {/* Glow background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[28%] h-[520px] w-[1200px] -translate-x-1/2 rounded-full opacity-50 blur-3xl" style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.25), transparent 70%)' }} />
          <div className="absolute right-[10%] top-[55%] h-[280px] w-[480px] rounded-full opacity-40 blur-2xl" style={{ background: 'radial-gradient(closest-side, rgba(16,185,129,0.25), transparent 70%)' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-emerald-900/30 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-600/40">
              NEW
              <span className="ml-2 text-gray-300">BPO OS AI is now available</span>
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              All‑in‑one platform to simplify your business workflow
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-gray-400">
              Harness AI for seamless project management, job operations, and team collaboration — tailored for growing BPOs.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                Try BPO OS for Free
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-md bg-white/5 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/15 hover:bg-white/10"
              >
                Schedule a Demo
              </Link>
            </div>
          </div>

          {/* Mocked dashboard preview */}
          <div className="mt-12">
            <div className="relative mx-auto max-w-5xl rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4 shadow-2xl shadow-emerald-500/10">
              <div className="absolute -inset-10 -z-10 rounded-[28px] bg-gradient-to-b from-emerald-500/15 to-indigo-500/10 blur-3xl" />
              <div className="rounded-xl bg-[#0e1318] p-4 ring-1 ring-white/10">
                {/* top bar */}
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/70" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                  <span className="h-3 w-3 rounded-full bg-green-400/70" />
                  <div className="ml-auto h-6 w-40 rounded bg-white/5" />
                </div>
                {/* skeleton rows */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="col-span-2 space-y-3">
                    <div className="h-10 rounded-md bg-white/5" />
                    <div className="h-24 rounded-md bg-white/5" />
                    <div className="h-24 rounded-md bg-white/5" />
                    <div className="h-24 rounded-md bg-white/5" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-10 rounded-md bg-white/5" />
                    <div className="h-24 rounded-md bg-white/5" />
                    <div className="h-24 rounded-md bg-white/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos row */}
      <section className="bg-[#0b0f13] py-10 text-gray-400">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-70">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="h-6 w-28 rounded bg-white/5" />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#0b0f13] pb-24 pt-6 text-gray-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-gray-300 ring-1 ring-inset ring-white/10">
              Features
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Powerful features for enhanced productivity
            </h2>
            <p className="mt-4 text-gray-400">
              Discover the tools that take your business workflow to the next level.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">Automate Workflow & Tasks</h3>
              <p className="mt-2 text-sm text-gray-400">
                Build automations in seconds and let AI handle the heavy lifting. Keep your team focused on what matters most.
              </p>
              <div className="mt-6 h-64 rounded-xl bg-[#0e1318] ring-1 ring-white/10" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">Smart Communication</h3>
              <p className="mt-2 text-sm text-gray-400">
                Collaborate seamlessly with integrated messaging and conferencing powered by AI assistance.
              </p>
              <div className="mt-6 h-64 rounded-xl bg-[#0e1318] ring-1 ring-white/10" />
            </div>
          </div>

          {/* Secondary CTAs */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-400"
            >
              Browse Jobs
            </Link>
            <Link
              to="/bposchool"
              className="inline-flex items-center justify-center rounded-md bg-white/5 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/15 hover:bg-white/10"
            >
              Learn in BPO School
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

