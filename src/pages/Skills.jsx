import { motion } from 'framer-motion';

export default function Skills() {
  const skillGroups = [
    {
      title: 'Front-End Development',
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      items: [
        'HTML5',
        'CSS3',
        'JavaScript',
        'Responsive Design',
        'Bootstrap',
        'Tailwind CSS',
        'UI/UX Design',
        'Accessibility',
        'Responsive Layout Architecture',
        'Landing Page Design'
      ]
    },
    {
      title: 'Back-End Development',
      icon: (
        <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      items: [
        'PHP',
        'MySQL',
        'Database Management',
        'CRUD Operations',
        'Authentication Systems',
        'API Integration',
        'Form Processing',
        'Session Handling',
        'Server-Side Logic'
      ]
    },
    {
      title: 'Software Engineering Core',
      icon: (
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      items: [
        'Software Development Life Cycle (SDLC)',
        'Object-Oriented Programming (OOP)',
        'Database Design',
        'Requirement Analysis',
        'Problem Solving',
        'Debugging',
        'Testing & Quality Assurance',
        'Software Documentation',
        'Agile Methodology',
        'System Design',
        'Project Planning'
      ]
    },
    {
      title: 'Programming Languages',
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      items: ['JavaScript', 'PHP', 'SQL', 'Java (Basic)', 'Python (Basic)', 'HTML', 'CSS']
    },
    {
      title: 'Development Tools',
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a2 2 0 01-2 2H13a2 2 0 01-2-2V4zM4 14a2 2 0 114 0v1a2 2 0 01-2 2H6a2 2 0 01-2-2v-1zM18 14a2 2 0 114 0v1a2 2 0 01-2 2h-2a2 2 0 01-2-2v-1z" />
        </svg>
      ),
      items: ['Visual Studio Code', 'Git & GitHub', 'XAMPP', 'Figma', 'Microsoft Office', 'Browser DevTools', 'Vite', 'Render']
    },
    {
      title: 'Professional Skills',
      icon: (
        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      items: [
        'Communication',
        'Team Collaboration',
        'Leadership',
        'Project Management',
        'Critical Thinking',
        'Time Management',
        'Research & Analysis',
        'Client Communication',
        'Problem Analysis',
        'Requirements Gathering'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="min-h-screen py-16 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-80 h-80 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-80 h-80 bg-pink-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-4">
            Technical Stack & Abilities
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            A broader view of my development skills, engineering mindset, and the tools I use to deliver polished digital solutions.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {[
            'Responsive UI Design',
            'Database-Driven Systems',
            'Client-Facing Portfolios',
            'Freelance Delivery Workflow'
          ].map((label) => (
            <div key={label} className="p-4 rounded-2xl glass-panel text-center text-sm font-semibold text-gray-200">
              {label}
            </div>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={cardVariants}
              className="p-6 rounded-2xl glass-panel relative overflow-hidden group hover:border-purple-500/30 transition duration-300"
              whileHover={{ y: -3 }}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/2 rounded-full blur-2xl group-hover:bg-purple-600/5 transition duration-300 pointer-events-none"></div>

              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl shrink-0">{group.icon}</div>
                <h3 className="text-base font-bold text-white tracking-tight leading-tight">{group.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-white/5 hover:bg-purple-600/10 text-xs text-gray-300 hover:text-purple-400 border border-white/5 hover:border-purple-500/30 rounded-lg transition duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
