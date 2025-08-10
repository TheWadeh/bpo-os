import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function JobDetail() {
  const { id } = useParams()
  const [job, setJob] = useState(null)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/api/jobs/${id}`)
        setJob(response.data)
      } catch (error) {
        console.error('Error fetching job:', error)
      }
    }
    fetchJob()
  }, [id])

  if (!job) {
    return <div className="text-text-white">Loading job details...</div>
  }

  return (
    <section className="text-text-white">
      <Link to="/jobs" className="text-soft-cyan hover:underline">← Back to Jobs</Link>
      <h2 className="mt-2 text-2xl font-semibold text-text-white">{job.title}</h2>
      <p className="mt-2 text-text-light-gray">Company: {job.companyName}</p>
      <p className="text-text-light-gray">Location: {job.location}</p>
      <p className="text-text-light-gray">Job Type: {job.jobType}</p>
      <p className="text-text-light-gray">Salary Range: {job.salaryRange}</p>
      <p className="mt-4 text-text-light-gray">Description: {job.description}</p>
      <p className="text-text-light-gray">Requirements: {job.requirements}</p>
    </section>
  )
}







