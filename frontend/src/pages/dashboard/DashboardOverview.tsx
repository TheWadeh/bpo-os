import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Link } from 'react-router-dom';

const DashboardOverview: React.FC = () => {
  const [metrics, setMetrics] = useState({
    clients: 0,
    leads: 0,
    projects: 0,
    tasks: 0,
    jobs: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const clientsResponse = await api.get('/api/clients');
        const leadsResponse = await api.get('/api/leads');
        const projectsResponse = await api.get('/api/projects');
        const tasksResponse = await api.get('/api/tasks');
        const jobsResponse = await api.get('/api/jobs');

        setMetrics({
          clients: clientsResponse.data.length,
          leads: leadsResponse.data.length,
          projects: projectsResponse.data.length,
          tasks: tasksResponse.data.length,
          jobs: jobsResponse.data.length,
        });
      } catch (error) {
        console.error('Error fetching dashboard metrics:', error);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="text-text-white p-4">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="card-base p-4 text-center">
          <h3 className="text-lg font-semibold text-text-light-gray">Clients</h3>
          <p className="text-4xl font-bold text-neon-green">{metrics.clients}</p>
        </div>
        <div className="card-base p-4 text-center">
          <h3 className="text-lg font-semibold text-text-light-gray">Leads</h3>
          <p className="text-4xl font-bold text-neon-green">{metrics.leads}</p>
        </div>
        <div className="card-base p-4 text-center">
          <h3 className="text-lg font-semibold text-text-light-gray">Projects</h3>
          <p className="text-4xl font-bold text-neon-green">{metrics.projects}</p>
        </div>
        <div className="card-base p-4 text-center">
          <h3 className="text-lg font-semibold text-text-light-gray">Tasks</h3>
          <p className="text-4xl font-bold text-neon-green">{metrics.tasks}</p>
        </div>
        <div className="card-base p-4 text-center">
          <h3 className="text-lg font-semibold text-text-light-gray">Jobs</h3>
          <p className="text-4xl font-bold text-neon-green">{metrics.jobs}</p>
        </div>
      </div>

      <div className="card-base">
        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/dashboard/crm" className="btn-secondary text-center py-3">CRM Dashboard</Link>
          <Link to="/dashboard/projects" className="btn-secondary text-center py-3">Projects Dashboard</Link>
          <Link to="/dashboard/ai-insights" className="btn-secondary text-center py-3">AI Insights</Link>
          <Link to="/dashboard/job-posting" className="btn-secondary text-center py-3">Job Posting Portal</Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
