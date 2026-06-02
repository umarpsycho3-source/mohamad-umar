import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getProjects, 
  saveProject, 
  deleteProject, 
  getMessages, 
  deleteMessage 
} from '../data/storage';

export default function Dashboard() {
  // Lazily initialize state to avoid synchronous useEffect setState calls and improve performance
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('umar_admin_auth') === 'true';
  });
  const [accessEmail, setAccessEmail] = useState('');
  const [accessPassword, setAccessPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'projects', 'messages'

  // Admin Data State - loaded asynchronously
  const [projectsList, setProjectsList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);

  // Modal Control
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    id: '',
    name: '',
    shortDescription: '',
    technologies: '',
    category: 'Web App',
    completionDate: '',
    liveDemo: '',
    github: '',
    image: '',
    video: '',
    caseStudy: ''
  });

  const [activeMsg, setActiveMsg] = useState(null); // Message for read details modal

  // Form errors
  const [formErrors, setFormErrors] = useState({});

  const loadAdminData = useCallback(async () => {
    const [projects, messages] = await Promise.all([getProjects(), getMessages()]);
    setProjectsList(projects);
    setMessagesList(messages);
  }, []);

  // Load data on mount if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated, loadAdminData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailMatch = accessEmail.trim().toLowerCase() === 'umarxgamer04@gmail.com';
    const passwordMatch = accessPassword === 'UmarTaper1234';
    const passcodeMatch = accessEmail.trim().toLowerCase() === 'admin' && accessPassword === 'admin123';

    if ((emailMatch && passwordMatch) || passcodeMatch) {
      setIsAuthenticated(true);
      sessionStorage.setItem('umar_admin_auth', 'true');
      setLoginError('');
      await loadAdminData();
    } else {
      setLoginError('Invalid credentials.');
      setAccessEmail('');
      setAccessPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('umar_admin_auth');
  };

  // Delete message
  const handleDeleteMsg = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const updated = await deleteMessage(id);
      setMessagesList(updated);
      if (activeMsg && activeMsg.id === id) setActiveMsg(null);
    }
  };

  // Open modal to add project
  const handleAddProject = () => {
    setEditingProject(null);
    setProjectForm({
      id: '',
      name: '',
      shortDescription: '',
      technologies: '',
      category: 'Web App',
      completionDate: new Date().toISOString().split('T')[0],
      liveDemo: '',
      github: '',
      image: '/projects/portfolio.svg',
      video: '',
      caseStudy: ''
    });
    setFormErrors({});
    setIsProjectModalOpen(true);
  };

  // Open modal to edit project
  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      ...project,
      technologies: project.technologies.join(', ')
    });
    setFormErrors({});
    setIsProjectModalOpen(true);
  };

  // Save/Update project form
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    
    // Simple Validation
    const errors = {};
    if (!projectForm.name.trim()) errors.name = 'Project name is required';
    if (!projectForm.shortDescription.trim()) errors.shortDescription = 'Short description is required';
    if (!projectForm.technologies.trim()) errors.technologies = 'Technologies are required (comma separated)';
    if (!projectForm.image.trim()) errors.image = 'Image path/URL is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const payload = {
      ...projectForm,
      id: editingProject ? editingProject.id : undefined,
      technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean)
    };

    const updated = await saveProject(payload);
    setProjectsList(updated);
    setIsProjectModalOpen(false);
  };

  const handleDeleteProj = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updated = await deleteProject(id);
      setProjectsList(updated);
    }
  };

  // Login Protection screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4">
        <motion.div 
          className="w-full max-w-md p-8 rounded-2xl glass-panel relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Accent light decoration */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-600/10 border border-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Admin Gateway</h2>
            <p className="text-gray-400 mt-2 text-sm">Please authorize to manage your portfolio</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6" autoComplete="off">
            <div>
              <label htmlFor="accessEmail" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Access Email
              </label>
              <input
                type="text"
                id="accessEmail"
                name="access-email"
                value={accessEmail}
                onChange={(e) => setAccessEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg glass-input text-white ${loginError ? 'border-red-500/50' : ''}`}
                placeholder="Enter access email"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                required
              />
            </div>

            <div>
              <label htmlFor="accessPassword" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Access Password
              </label>
              <input
                type="password"
                id="accessPassword"
                name="access-password"
                value={accessPassword}
                onChange={(e) => setAccessPassword(e.target.value)}
                className={`w-full px-4 py-3 text-center tracking-widest text-lg font-bold rounded-lg glass-input text-white ${loginError ? 'border-red-500/50' : ''}`}
                placeholder="Enter access password"
                autoComplete="new-password"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                required
              />
              {loginError && (
                <motion.p
                  className="text-xs text-red-400 text-center mt-2 font-medium"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {loginError}
                </motion.p>
              )}
            </div>

            <button
              id="admin-login-btn"
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-lg shadow-lg hover:shadow-purple-500/25 transition duration-300 transform active:scale-98"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
              Admin Workspace
            </h2>
            <p className="text-gray-400 text-sm mt-1">Hello Umar, customize your portfolio contents in real-time.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 border border-red-500/30 hover:border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm transition"
          >
            Logout Session
          </button>
        </div>

        {/* Dashboard Tabs Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 items-start">
          
          {/* Left Panel Sidebar */}
          <div className="md:col-span-1 space-y-4">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'overview' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25' : 'glass-panel hover:bg-white/5 text-gray-300'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"/>
              </svg>
              Overview & Stats
            </button>
            <button 
              id="admin-projects-tab"
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'projects' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25' : 'glass-panel hover:bg-white/5 text-gray-300'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
              Projects Manager ({projectsList.length})
            </button>
            <button 
              id="admin-messages-tab"
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'messages' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25' : 'glass-panel hover:bg-white/5 text-gray-300'}`}
            >
              <div className="relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                {messagesList.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
              </div>
              Inbox Messages ({messagesList.length})
            </button>
          </div>

          {/* Right Panel Main Panel Content */}
          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="p-6 rounded-2xl glass-panel flex justify-between items-center relative overflow-hidden">
                      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl"></div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Total Projects</h4>
                        <p className="text-4xl font-extrabold mt-2 text-white">{projectsList.length}</p>
                      </div>
                      <div className="p-4 bg-purple-600/10 text-purple-400 rounded-xl">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl glass-panel flex justify-between items-center relative overflow-hidden">
                      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl"></div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Messages Inbox</h4>
                        <p className="text-4xl font-extrabold mt-2 text-white">{messagesList.length}</p>
                      </div>
                      <div className="p-4 bg-pink-600/10 text-pink-400 rounded-xl">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* SVG Charts Area */}
                  <div className="p-6 rounded-2xl glass-panel">
                    <h3 className="text-lg font-bold mb-6">Portfolio Distribution & Activity</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* SVG Category Bar Chart */}
                      <div className="flex flex-col justify-between">
                        <h4 className="text-sm text-gray-400 mb-4">Project Breakdown</h4>
                        <div className="space-y-4">
                          {['Web App', 'Website', 'Mobile App'].map(cat => {
                            const count = projectsList.filter(p => p.category === cat).length;
                            const total = projectsList.length || 1;
                            const percent = (count / total) * 100;
                            return (
                              <div key={cat}>
                                <div className="flex justify-between text-xs mb-1">
                                  <span>{cat}</span>
                                  <span className="font-semibold">{count} ({Math.round(percent)}%)</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percent}%` }}
                                    transition={{ duration: 0.8 }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* SVG Line Graph Simulation for messages activity */}
                      <div className="flex flex-col justify-between">
                        <h4 className="text-sm text-gray-400 mb-4">Inbox Submissions Flow</h4>
                        <div className="h-32 w-full flex items-end justify-between relative px-2">
                          {/* Visual Grid Lines */}
                          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            <div className="w-full border-t border-white/5"></div>
                            <div className="w-full border-t border-white/5"></div>
                            <div className="w-full border-t border-white/5"></div>
                          </div>

                          {/* Columns simulating daily messages */}
                          {Array.from({ length: 7 }).map((_, idx) => {
                            const heights = [20, 45, 10, 80, 30, 95, 15]; // Static aesthetic trend
                            const height = heights[idx];
                            return (
                              <div key={idx} className="flex flex-col items-center gap-1 z-10 w-6">
                                <motion.div 
                                  className="w-2.5 bg-purple-500/30 border border-purple-500/50 hover:bg-purple-500 rounded-t-sm"
                                  initial={{ height: 0 }}
                                  animate={{ height: `${height}%` }}
                                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                                  style={{ minHeight: '4px' }}
                                />
                                <span className="text-[9px] text-gray-500 uppercase">D{idx+1}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent messages quick-look */}
                  <div className="p-6 rounded-2xl glass-panel">
                    <h3 className="text-lg font-bold mb-4">Recent Feedback</h3>
                    {messagesList.length === 0 ? (
                      <p className="text-sm text-gray-500 py-4 text-center">No contact submissions found in this session.</p>
                    ) : (
                      <div className="divide-y divide-white/5">
                        {messagesList.slice(0, 3).map(m => (
                          <div key={m.id} className="py-3 flex justify-between items-center text-sm">
                            <div>
                              <p className="font-semibold text-white">{m.name}</p>
                              <p className="text-xs text-gray-400 line-clamp-1">{m.subject} — {m.message}</p>
                            </div>
                            <span className="text-xs text-gray-500">{new Date(m.date).toLocaleDateString()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Tab 2: PROJECTS MANAGER */}
              {activeTab === 'projects' && (
                <motion.div
                  key="projects-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Manage Portfolio Projects</h3>
                    <button 
                      id="admin-add-project-btn"
                      onClick={handleAddProject}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                      </svg>
                      Add New Project
                    </button>
                  </div>

                  {projectsList.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 glass-panel rounded-2xl">
                      No projects currently configured in the database.
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {projectsList.map(p => (
                        <div key={p.id} className="p-4 rounded-xl glass-panel flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 hover:border-white/10 transition">
                          <div className="flex gap-4 items-center">
                            <img src={p.image} alt={p.name} className="w-16 h-12 object-cover rounded bg-white/5" />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-white text-base">{p.name}</h4>
                                <span className="px-2 py-0.5 text-[10px] bg-purple-600/20 text-purple-400 border border-purple-500/20 rounded-full font-semibold">
                                  {p.category}
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 line-clamp-1 max-w-lg mt-1">{p.shortDescription}</p>
                            </div>
                          </div>

                          <div className="flex gap-2 items-center justify-end">
                            <button
                              onClick={() => handleEditProject(p)}
                              className="p-2 border border-white/10 hover:border-purple-500 bg-white/5 hover:bg-purple-500/10 text-gray-400 hover:text-purple-400 rounded-lg text-xs transition"
                              title="Edit project"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteProj(p.id)}
                              className="p-2 border border-red-500/20 hover:border-red-500 bg-red-500/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-lg text-xs transition"
                              title="Delete project"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Tab 3: INBOX MESSAGES */}
              {activeTab === 'messages' && (
                <motion.div
                  key="messages-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold">Feedback Inbox</h3>

                  {messagesList.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 glass-panel rounded-2xl">
                      Inbox is empty. Submit a test message on the contact page!
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {messagesList.map(m => (
                        <div 
                          key={m.id} 
                          className="p-5 rounded-2xl glass-panel relative hover:border-white/10 transition cursor-pointer"
                          onClick={() => setActiveMsg(m)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-white text-base">{m.name}</h4>
                              <p className="text-xs text-purple-400">{m.email}</p>
                            </div>
                            <span className="text-[10px] text-gray-500 font-semibold">{new Date(m.date).toLocaleString()}</span>
                          </div>
                          
                          <p className="font-medium text-sm text-gray-300 mb-2 line-clamp-1">Sub: {m.subject}</p>
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{m.message}</p>
                          
                          <div className="flex gap-2 justify-end mt-4 pt-3 border-t border-white/5" onClick={e => e.stopPropagation()}>
                            <button
                              onClick={() => setActiveMsg(m)}
                              className="px-3 py-1 bg-white/5 hover:bg-purple-600/20 text-gray-300 hover:text-purple-400 border border-white/10 rounded-lg text-xs transition"
                            >
                              Read Full Message
                            </button>
                            <button
                              onClick={() => handleDeleteMsg(m.id)}
                              className="p-1 text-gray-500 hover:text-red-400 transition"
                              title="Delete message"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ---------------- PROJECT EDIT / ADD MODAL ---------------- */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">
                  {editingProject ? `Edit Project: ${editingProject.name}` : 'Add New Portfolio Project'}
                </h3>
                <button 
                  onClick={() => setIsProjectModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Project Title</label>
                    <input
                      type="text"
                      id="project-name-input"
                      value={projectForm.name}
                      onChange={e => setProjectForm({...projectForm, name: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg glass-input text-sm"
                      placeholder="e.g. POS Management System"
                    />
                    {formErrors.name && <p className="text-red-400 text-xs mt-0.5">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Category</label>
                    <select
                      value={projectForm.category}
                      onChange={e => setProjectForm({...projectForm, category: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg glass-input text-sm"
                    >
                      <option value="Web App">Web App</option>
                      <option value="Website">Website</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Desktop App">Desktop App</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Short Description</label>
                  <input
                    type="text"
                    value={projectForm.shortDescription}
                    onChange={e => setProjectForm({...projectForm, shortDescription: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg glass-input text-sm"
                    placeholder="Describe the system in one engaging sentence..."
                  />
                  {formErrors.shortDescription && <p className="text-red-400 text-xs mt-0.5">{formErrors.shortDescription}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Technologies Used (Comma-separated)</label>
                  <input
                    type="text"
                    value={projectForm.technologies}
                    onChange={e => setProjectForm({...projectForm, technologies: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg glass-input text-sm"
                    placeholder="React, PHP, MySQL, CSS"
                  />
                  {formErrors.technologies && <p className="text-red-400 text-xs mt-0.5">{formErrors.technologies}</p>}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Live Demo URL</label>
                    <input
                      type="url"
                      value={projectForm.liveDemo}
                      onChange={e => setProjectForm({...projectForm, liveDemo: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg glass-input text-sm"
                      placeholder="https://example.com/demo"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">GitHub Repository URL</label>
                    <input
                      type="url"
                      value={projectForm.github}
                      onChange={e => setProjectForm({...projectForm, github: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg glass-input text-sm"
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Preview Image URL/Path</label>
                    <input
                      type="text"
                      value={projectForm.image}
                      onChange={e => setProjectForm({...projectForm, image: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg glass-input text-sm"
                      placeholder="/projects/pos.svg"
                    />
                    {formErrors.image && <p className="text-red-400 text-xs mt-0.5">{formErrors.image}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Video Demo Link (Optional)</label>
                    <input
                      type="text"
                      value={projectForm.video}
                      onChange={e => setProjectForm({...projectForm, video: e.target.value})}
                      className="w-full px-3 py-2 rounded-lg glass-input text-sm"
                      placeholder="/projects/pos-demo.mp4"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Case Study (Text description)</label>
                  <textarea
                    value={projectForm.caseStudy}
                    onChange={e => setProjectForm({...projectForm, caseStudy: e.target.value})}
                    rows="3"
                    className="w-full px-3 py-2 rounded-lg glass-input text-sm resize-none"
                    placeholder="Detail the architecture, system processes, and major challenges solved..."
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-400 hover:text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    id="save-project-btn"
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg text-sm font-semibold transition"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ---------------- MESSAGE READ MODAL ---------------- */}
      <AnimatePresence>
        {activeMsg && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{activeMsg.name}</h3>
                  <a href={`mailto:${activeMsg.email}`} className="text-xs text-purple-400 hover:underline">{activeMsg.email}</a>
                </div>
                <button 
                  onClick={() => setActiveMsg(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Date Received</h4>
                  <p className="text-sm text-gray-300 font-medium">{new Date(activeMsg.date).toLocaleString()}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Subject</h4>
                  <p className="text-sm text-white font-semibold">{activeMsg.subject}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Message Content</h4>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-gray-200 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                    {activeMsg.message}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => handleDeleteMsg(activeMsg.id)}
                  className="px-4 py-2 border border-red-500/20 hover:border-red-500 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded-lg text-sm transition"
                >
                  Delete Message
                </button>
                <button
                  onClick={() => setActiveMsg(null)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
