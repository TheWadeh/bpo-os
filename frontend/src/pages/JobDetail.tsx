import { useParams, Link } from 'react-router-dom'

export default function JobDetail() {
  const { id } = useParams()

  return (
    <section>
      <Link to="/jobs" className="text-sm text-blue-600 hover:underline">← Back to Jobs</Link>
      <h2 className="mt-2 text-2xl font-semibold">Job #{id}</h2>
      <p className="mt-2 text-gray-600">Full job details will appear here.</p>
    </section>
  )
}





