import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="py-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          BPO OS — AI-Powered Operating System
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Manage clients, projects, and jobs with AI insights. Learn how to launch and grow your BPO in Ethiopia.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link to="/register" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Join as Entrepreneur
          </Link>
          <Link to="/jobs" className="rounded-md border border-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-50">
            Browse Jobs
          </Link>
          <Link to="/bposchool" className="rounded-md border border-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-50">
            Learn in BPO School
          </Link>
        </div>
      </div>
    </section>
  )
}



