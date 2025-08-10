import React, { useState } from 'react'
import CrmDashboard from './CrmDashboard'
import ProjectsDashboard from './ProjectsDashboard'
import AiInsightsDashboard from './AiInsightsDashboard'
import JobPostingPortal from './JobPostingPortal'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'crm' | 'jobs' | 'ai' | 'projects'>('crm')

  const tabClass = (tab: string) =>
    `px-4 py-2 rounded-md text-sm font-medium ${activeTab === tab ? 'bg-soft-cyan text-text-white' : 'text-text-light-gray hover:text-text-white hover:bg-white/5'}`

  return (
    <section className="text-text-white">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <button className={tabClass('crm')} onClick={() => setActiveTab('crm')}>CRM</button>
        <button className={tabClass('jobs')} onClick={() => setActiveTab('jobs')}>Job Posting Portal</button>
        <button className={tabClass('ai')} onClick={() => setActiveTab('ai')}>AI Insights</button>
        <button className={tabClass('projects')} onClick={() => setActiveTab('projects')}>Projects (Kanban)</button>
      </div>

      <div className="card-base">
        {activeTab === 'crm' && <CrmDashboard />}
        {activeTab === 'jobs' && <JobPostingPortal />}
        {activeTab === 'ai' && <AiInsightsDashboard />}
        {activeTab === 'projects' && <ProjectsDashboard />}
      </div>
    </section>
  )
}
