import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function JobsList() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/api/jobs')
        setJobs(response.data)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }
    fetchJobs()
  }, [])

  return (
    <section className="text-text-white">
      <h2 className="text-2xl font-semibold mb-4">Jobs</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {jobs.map((job) => (
          <Link key={job.id} to={`/jobs/${job.id}`} className="card-base block">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-text-white">{job.title}</h3>
              <span className="text-xs text-text-light-gray">{job.jobType}</span>
            </div>
            <p className="text-sm text-text-light-gray">{job.companyName}</p>
            <p className="text-sm text-text-light-gray">{job.location}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}






