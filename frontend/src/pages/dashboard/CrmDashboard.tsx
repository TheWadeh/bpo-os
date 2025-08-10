import React, { useState, useEffect } from 'react';
import api from '../../lib/api';

const CrmDashboard: React.FC = () => {
  const [clients, setClients] = useState([]);
  const [leads, setLeads] = useState([]);
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', company: '', country: '', notes: '' });
  const [newLead, setNewLead] = useState({ clientId: '', stage: 'Prospect', value: '', source: '' });
  const [showAiInsightsModal, setShowAiInsightsModal] = useState(false);
  const [aiInsights, setAiInsights] = useState('');
  const [selectedLeadForAi, setSelectedLeadForAi] = useState<any>(null);

  const leadStages = ['Prospect', 'Qualified', 'Negotiation', 'Closed'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await api.get('/api/clients');
        setClients(clientsResponse.data);
        const leadsResponse = await api.get('/api/leads');
        setLeads(leadsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/clients', newClient);
      setClients([...clients, response.data]);
      setNewClient({ name: '', email: '', phone: '', company: '', country: '', notes: '' });
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/leads', newLead);
      setLeads([...leads, response.data]);
      setNewLead({ clientId: '', stage: 'Prospect', value: '', source: '' });
    } catch (error) {
      console.error('Error adding lead:', error);
    }
  };

  const handleUpdateLeadStage = async (leadId: number, newStage: string) => {
    try {
      await api.put(`/api/leads/${leadId}`, { stage: newStage });
      setLeads(leads.map(lead => (lead.id === leadId ? { ...lead, stage: newStage } : lead)));
    } catch (error) {
      console.error('Error updating lead stage:', error);
    }
  };

  const handleGetAiInsights = async (lead: any) => {
    setSelectedLeadForAi(lead);
    setShowAiInsightsModal(true);
    try {
      const response = await api.post('/api/ai/insights', {
        clientName: clients.find(c => c.id === lead.clientId)?.name || 'N/A',
        leadStage: lead.stage,
        value: lead.value,
      });
      setAiInsights(response.data.insights);
    } catch (error) {
      console.error('Error getting AI insights:', error);
      setAiInsights('Failed to get AI insights.');
    }
  };

  return (
    <div className="text-text-white p-4">
      <h2 className="text-2xl font-semibold mb-4">CRM Dashboard</h2>

      {/* Add New Client Form */}
      <div className="card-base mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Client</h3>
        <form onSubmit={handleAddClient} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Name</label>
            <input type="text" value={newClient.name} onChange={(e) => setNewClient({ ...newClient, name: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Email</label>
            <input type="email" value={newClient.email} onChange={(e) => setNewClient({ ...newClient, email: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Phone</label>
            <input type="text" value={newClient.phone} onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Company</label>
            <input type="text" value={newClient.company} onChange={(e) => setNewClient({ ...newClient, company: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Country</label>
            <input type="text" value={newClient.country} onChange={(e) => setNewClient({ ...newClient, country: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Notes</label>
            <textarea value={newClient.notes} onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white"></textarea>
          </div>
          <button type="submit" className="btn-primary">Add Client</button>
        </form>
      </div>

      {/* Clients List */}
      <div className="card-base mb-6">
        <h3 className="text-xl font-semibold mb-4">Clients List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-navy-blue">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light-gray uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light-gray uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light-gray uppercase tracking-wider">Company</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light-gray uppercase tracking-wider">Country</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-light-gray uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {clients.map((client: any) => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-white">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light-gray">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light-gray">{client.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-light-gray">{client.country}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-soft-cyan hover:text-soft-cyan/80 mr-4">Edit</button>
                    <button className="text-red-500 hover:text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Lead Form */}
      <div className="card-base mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Lead</h3>
        <form onSubmit={handleAddLead} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Client</label>
            <select value={newLead.clientId} onChange={(e) => setNewLead({ ...newLead, clientId: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white">
              <option value="">Select Client</option>
              {clients.map((client: any) => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Stage</label>
            <select value={newLead.stage} onChange={(e) => setNewLead({ ...newLead, stage: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white">
              {leadStages.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Value</label>
            <input type="number" value={newLead.value} onChange={(e) => setNewLead({ ...newLead, value: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Source</label>
            <input type="text" value={newLead.source} onChange={(e) => setNewLead({ ...newLead, source: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <button type="submit" className="btn-primary">Add Lead</button>
        </form>
      </div>

      {/* Lead Pipeline */}
      <div className="card-base">
        <h3 className="text-xl font-semibold mb-4">Lead Pipeline</h3>
        <div className="flex space-x-4 overflow-x-auto">
          {leadStages.map(stage => (
            <div key={stage} className="w-64 flex-shrink-0 bg-navy-blue p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-4 text-text-white">{stage}</h4>
              <div className="space-y-4">
                {leads.filter(lead => lead.stage === stage).map((lead: any) => (
                  <div key={lead.id} className="card-base p-3">
                    <p className="font-medium text-text-white">Client: {clients.find(c => c.id === lead.clientId)?.name || 'N/A'}</p>
                    <p className="text-sm text-text-light-gray">Value: ${lead.value}</p>
                    <p className="text-sm text-text-light-gray">Source: {lead.source}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <select 
                        value={lead.stage} 
                        onChange={(e) => handleUpdateLeadStage(lead.id, e.target.value)}
                        className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white text-sm"
                      >
                        {leadStages.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button 
                        onClick={() => handleGetAiInsights(lead)}
                        className="btn-secondary ml-2 px-3 py-1 text-xs"
                      >
                        AI Insights
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Modal */}
      {showAiInsightsModal && selectedLeadForAi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card-base p-6 w-11/12 md:w-1/2 lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4 text-text-white">AI Insights for Lead: {clients.find(c => c.id === selectedLeadForAi.clientId)?.name || 'N/A'}</h3>
            <p className="text-text-light-gray whitespace-pre-wrap">{aiInsights}</p>
            <button onClick={() => setShowAiInsightsModal(false)} className="btn-primary mt-6">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrmDashboard;