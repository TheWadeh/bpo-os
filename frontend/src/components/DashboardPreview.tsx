import React from 'react'

export default function DashboardPreview() {
  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="absolute -inset-10 -z-10 rounded-[28px] bg-gradient-to-b from-neon-green/20 via-soft-cyan/10 to-transparent blur-3xl" />

      <div className="rounded-2xl bg-navy-blue-light/70 p-4 ring-1 ring-white/10 backdrop-blur">
        {/* Window controls + search */}
        <div className="mb-4 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-green-400/70" />
          <div className="ml-auto h-8 w-48 rounded-md bg-white/10" />
        </div>

        {/* Content Grid */}
        <div className="grid gap-4 md:grid-cols-12">
          {/* Mini sidebar */}
          <div className="hidden md:block md:col-span-2">
            <div className="space-y-3 rounded-xl bg-navy-blue p-3 ring-1 ring-white/10">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`h-8 rounded-md ${i === 0 ? 'bg-neon-green/30' : 'bg-white/5'}`} />
              ))}
            </div>
          </div>

          {/* Center content */}
          <div className="md:col-span-7 space-y-4">
            {/* Ongoing projects */}
            <div className="rounded-xl bg-navy-blue p-4 ring-1 ring-white/10">
              <div className="mb-3 flex items-center justify-between">
                <div className="h-5 w-40 rounded bg-white/10" />
                <div className="h-8 w-28 rounded bg-white/5" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-6 items-center gap-3">
                    <div className="col-span-2 h-6 rounded bg-white/5" />
                    <div className="h-6 rounded bg-white/5" />
                    <div className="h-6 rounded bg-white/5" />
                    <div className="h-6 rounded bg-white/5" />
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-neon-green" style={{ width: `${50 + i * 15}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* To-do and revenue */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-navy-blue p-4 ring-1 ring-white/10">
                <div className="mb-3 h-5 w-24 rounded bg-white/10" />
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                        {/* Play icon */}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-soft-cyan">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-40 rounded bg-white/10" />
                        <div className="h-2 w-24 rounded bg-white/5" />
                      </div>
                      <div className="h-6 w-10 rounded bg-white/5" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-navy-blue p-4 ring-1 ring-white/10">
                <div className="mb-3 h-5 w-36 rounded bg-white/10" />
                <div className="h-40 rounded-xl bg-gradient-to-tr from-white/5 to-white/0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="md:col-span-3">
            <div className="space-y-4 rounded-xl bg-navy-blue p-4 ring-1 ring-white/10">
              <div className="mb-2 flex items-center justify-between">
                <div className="h-5 w-24 rounded bg-white/10" />
                <div className="h-8 w-10 rounded bg-white/5" />
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-white/10" />
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-32 rounded bg-white/10" />
                    <div className="h-2 w-24 rounded bg-white/5" />
                  </div>
                  <div className="h-2 w-6 rounded bg-neon-green/60" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}