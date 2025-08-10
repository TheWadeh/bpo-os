import { Link } from 'react-router-dom'

export default function JobsList() {
  // Placeholder list; will be connected to backend GET /jobs
  const jobs = [
    { id: 1, title: 'Customer Support Agent', company: 'Acme Co.', location: 'Addis Ababa', jobType: 'Full-time' },
    { id: 2, title: 'Data Entry Specialist', company: 'Blue Nile Ltd.', location: 'Remote', jobType: 'Contract' },
  ]

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Jobs</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {jobs.map((job) => (
          <Link key={job.id} to={`/jobs/${job.id}`} className="block rounded-lg border border-gray-200 p-4 hover:shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{job.title}</h3>
              <span className="text-xs text-gray-600">{job.jobType}</span>
            </div>
            <p className="text-sm text-gray-600">{job.company}</p>
            <p className="text-sm text-gray-500">{job.location}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}





