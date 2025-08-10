import React, { useState, useEffect } from 'react';
import api from '../../lib/api';

const ProjectsDashboard: React.FC = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do', projectId: '', assignedTo: '', priority: '', dueDate: '' });
  const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const taskStatuses = ['To Do', 'In Progress', 'Done'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await api.get('/api/projects');
        setProjects(projectsResponse.data);
        const tasksResponse = await api.get('/api/tasks');
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/tasks', { ...newTask, projectId: selectedProject });
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '', status: 'To Do', projectId: '', assignedTo: '', priority: '', dueDate: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTaskStatus = async (taskId: number, newStatus: string) => {
    try {
      await api.put(`/api/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map(task => (task.id === taskId ? { ...task, status: newStatus } : task)));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setShowTaskDetailModal(true);
  };

  const filteredTasks = selectedProject 
    ? tasks.filter(task => task.projectId === selectedProject)
    : tasks;

  return (
    <div className="text-text-white p-4">
      <h2 className="text-2xl font-semibold mb-4">Projects Dashboard</h2>

      {/* Project Selection */}
      <div className="card-base mb-6">
        <h3 className="text-xl font-semibold mb-4">Select Project</h3>
        <select 
          value={selectedProject || ''} 
          onChange={(e) => setSelectedProject(parseInt(e.target.value))}
          className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white"
        >
          <option value="">All Projects</option>
          {projects.map((project: any) => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>

      {/* Add New Task Form */}
      <div className="card-base mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
        <form onSubmit={handleAddTask} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Title</label>
            <input type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Description</label>
            <textarea value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Status</label>
            <select value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white">
              {taskStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Assigned To</label>
            <input type="text" value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Priority</label>
            <input type="text" value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light-gray">Due Date</label>
            <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} className="mt-1 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white" />
          </div>
          <button type="submit" className="btn-primary">Add Task</button>
        </form>
      </div>

      {/* Kanban Board */}
      <div className="card-base">
        <h3 className="text-xl font-semibold mb-4">Kanban Board</h3>
        <div className="flex space-x-4 overflow-x-auto">
          {taskStatuses.map(status => (
            <div key={status} className="w-80 flex-shrink-0 bg-navy-blue p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-4 text-text-white">{status}</h4>
              <div className="space-y-4">
                {filteredTasks.filter(task => task.status === status).map((task: any) => (
                  <div key={task.id} className="card-base p-3 cursor-pointer" onClick={() => handleTaskClick(task)}>
                    <h5 className="font-medium text-text-white">{task.title}</h5>
                    <p className="text-sm text-text-light-gray">Project: {projects.find(p => p.id === task.projectId)?.name || 'N/A'}</p>
                    <p className="text-sm text-text-light-gray">Assigned To: {task.assignedTo || 'N/A'}</p>
                    <p className="text-sm text-text-light-gray">Priority: {task.priority || 'N/A'}</p>
                    <p className="text-sm text-text-light-gray">Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
                    <select 
                      value={task.status} 
                      onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                      className="mt-2 w-full rounded-md border-gray-700 bg-navy-blue focus:border-soft-cyan focus:ring-soft-cyan text-text-white text-sm"
                    >
                      {taskStatuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Detail Modal */}
      {showTaskDetailModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card-base p-6 w-11/12 md:w-1/2 lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4 text-text-white">Task Details: {selectedTask.title}</h3>
            <p className="text-text-light-gray">Description: {selectedTask.description}</p>
            <p className="text-text-light-gray">Status: {selectedTask.status}</p>
            <p className="text-text-light-gray">Project: {projects.find(p => p.id === selectedTask.projectId)?.name || 'N/A'}</p>
            <p className="text-text-light-gray">Assigned To: {selectedTask.assignedTo || 'N/A'}</p>
            <p className="text-text-light-gray">Priority: {selectedTask.priority || 'N/A'}</p>
            <p className="text-text-light-gray">Due Date: {selectedTask.dueDate ? new Date(selectedTask.dueDate).toLocaleDateString() : 'N/A'}</p>
            <button onClick={() => setShowTaskDetailModal(false)} className="btn-primary mt-6">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsDashboard;
