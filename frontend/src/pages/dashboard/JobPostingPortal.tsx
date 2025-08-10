import React, { useState, useEffect } from 'react';
import api from '../../lib/api';

const JobPostingPortal: React.FC = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', description: '', requirements: '', location: '', jobType: '', salaryRange: '', companyName: '' });
  const [editingJob, setEditingJob] = useState<any>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/jobs', newJob);
      setJobs([...jobs, response.data]);
      setNewJob({ title: '', description: '', requirements: '', location: '', jobType: '', salaryRange: '', companyName: '' });
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleUpdateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    try {
      const response = await api.put(`/api/jobs/${editingJob.id}`, editingJob);
      setJobs(jobs.map(job => (job.id === editingJob.id ? response.data : job)));
      setEditingJob(null);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleDeleteJob = async (jobId: number) => {
    try {
      await api.delete(`/api/jobs/${jobId}`);
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="text-text-white p-4">
      <h2 className="text-2xl font-semibold mb-4">Job Posting Portal</h2>

      {/* Add/Edit Job Form */}
      <div className="card-base mb-6">
        <h3 className="text-xl font-semibold mb-4">{editingJob ? 'Edit Job' : 'Add New Job'}</h3>
        <form onSubmit={editingJob ? handleUpdateJob : handleAddJob} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Title</label>
            <input type="text" value={editingJob ? editingJob.title : newJob.title} onChange={(e) => editingJob ? setEditingJob({ ...editingJob, title: e.target.value }) : setNewJob({ ...newJob, title: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Description</label>
            <textarea value={editingJob ? editingJob.description : newJob.description} onChange={(e) => editingJob ? setEditingJob({ ...editingJob, description: e.target.value }) : setNewJob({ ...newJob, description: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Requirements</label>
            <textarea value={editingJob ? editingJob.requirements : newJob.requirements} onChange={(e) => editingJob ? setEditingJob({ ...editingJob, requirements: e.target.value }) : setNewJob({ ...newJob, requirements: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Location</label>
            <input type="text" value={editingJob ? editingJob.location : newJob.location} onChange={(e) => editingJob ? setEditingJob({ ...editingJob, location: e.target.value }) : setNewJob({ ...newJob, location: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Job Type</label>
            <input type="text" value={editingJob ? editingJob.jobType : newJob.jobType} onChange={(e) => editingJob ? setEditingJob({ ...editingJob, jobType: e.target.value }) : setNewJob({ ...newJob, jobType: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Salary Range</label>
            <input type="text" value={editingJob ? editingJob.salaryRange : newJob.salaryRange} onChange={(e) => editingJob ? setEditingJob({ ...editingJob, salaryRange: e.target.value }) : setNewJob({ ...newJob, salaryRange: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Company Name</label>
            <input type="text" value={editingJob ? editingJob.companyName : newJob.companyName} onChange={(e) => editingJob ? setEditingJob({ ...editingJob, companyName: e.target.value }) : setNewJob({ ...newJob, companyName: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <button type="submit" className="btn-primary">{editingJob ? 'Update Job' : 'Add Job'}</button>
          {editingJob && <button type="button" onClick={() => setEditingJob(null)} className="btn-secondary ml-2">Cancel Edit</button>}
        </form>
      </div>

      {/* Posted Jobs List */}
      <div className="card-base">
        <h3 className="text-xl font-semibold mb-4">Your Posted Jobs</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-navy-blue">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light-gray uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light-gray uppercase tracking-wider">Company</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light-gray uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light-gray uppercase tracking-wider">Job Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light-gray uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {jobs.map((job: any) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-white">{job.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light-gray">{job.companyName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light-gray">{job.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light-gray">{job.jobType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => setEditingJob(job)} className="text-soft-cyan hover:text-soft-cyan/80 mr-4">Edit</button>
                    <button onClick={() => handleDeleteJob(job.id)} className="text-red-500 hover:text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobPostingPortal;
