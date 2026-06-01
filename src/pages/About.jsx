import { motion } from 'framer-motion';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const educationTimeline = [
    {
      title: "Diploma in Information Technology",
      status: "Completed",
      institution: "Built a solid foundation in:",
      skills: ["Programming Fundamentals", "Database Management", "Web Development", "Networking", "Software Concepts", "System Development"],
      color: "from-green-500/20 to-emerald-500/20 text-green-400"
    },
    {
      title: "English Qualification",
      status: "Completed",
      institution: "Improved core professional competencies in:",
      skills: ["Professional Communication", "Writing Skills", "Speaking Skills", "Business Communication"],
      color: "from-blue-500/20 to-cyan-500/20 text-blue-400"
    },
    {
      title: "Higher National Diploma (HND) in IT",
      status: "Currently Studying (Semester 4)",
      institution: "Sri Lanka Institute of IT / HND Center",
      details: "Rigorous focus on advanced computing paradigms including:",
      skills: ["Software Engineering", "System Analysis & Design", "Web Development", "Database Systems", "Programming", "Networking", "Project Management", "SDLC Methodologies"],
      color: "from-purple-500/20 to-pink-500/20 text-purple-400"
    },
    {
      title: "After HND - Degree Pathway",
      status: "Expected to start on June 2027",
      institution: "BSc (Hons) Software Engineering",
      details: "Plan to pursue a Bachelor's Degree in Software Engineering / Information Technology to strengthen my expertise in software architecture, development, and engineering practices.",
      skills: ["Software Architecture", "Enterprise Engineering", "Advanced SDLC"],
      color: "from-red-500/20 to-pink-500/20 text-pink-400"
    }
  ];

  return (
    <section className="min-h-screen py-16 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative">
      {/* Background soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-4">
            About Mohamad Umar
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Discover my career journey, academic background, and professional experience.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-12 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Who I Am & Fiverr Experience */}
          <motion.div className="md:col-span-5 space-y-6" variants={itemVariants}>
            <div className="relative p-6 rounded-2xl glass-panel relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <h3 className="text-2xl font-bold mb-4 text-purple-400">My Journey</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                I am a dedicated and enthusiastic Software Engineering and IT student with a strong passion for technology, software development, and digital innovation. I enjoy building responsive websites, management systems, and scalable software solutions.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                My journey in technology began through my interest in computers and web development, which motivated me to pursue studies in Information Technology and Software Engineering.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Alongside my academic journey, I work as a freelancer delivering digital services and building practical solutions for real-world problems. My long-term goal is to become a highly skilled Full-Stack Developer, Software Engineer, and Tech Entrepreneur while contributing to innovative software products.
              </p>
            </div>

            {/* Experience Section: Fiverr Freelance */}
            <div className="p-6 rounded-2xl glass-panel relative overflow-hidden group">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-pink-400">Experience</h3>
                <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-gray-400 font-semibold uppercase">Fiverr Freelance</span>
              </div>

              <h4 className="text-base font-bold text-white mb-2">Freelance Web Developer & Designer</h4>
              <p className="text-gray-300 text-xs leading-relaxed mb-4">
                Working as a freelancer by delivering professional web development, software development, and design services to global clients.
              </p>

              <ul className="space-y-2 text-xs text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                  Consulting with clients to analyze custom technical requirements.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                  Translating business objectives into modern functional software.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                  Maintaining high standards of professionalism and prompt delivery.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                  Providing iterative agile updates and scalable codebase structures.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Complete Educational Journey Timeline */}
          <motion.div className="md:col-span-7 space-y-6" variants={itemVariants}>
            <h3 className="text-2xl font-bold text-white mb-6">Education Timeline</h3>

            <div className="relative border-l border-white/10 ml-4 pl-6 space-y-8">
              {educationTimeline.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline indicator node */}
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 border-2 border-purple-500 group-hover:scale-125 transition duration-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
                  </span>

                  <div className="p-5 rounded-xl glass-panel glass-panel-hover relative overflow-hidden">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h4 className="font-bold text-white text-base leading-tight">{edu.title}</h4>
                      <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 border border-white/10 text-gray-300">
                        {edu.status}
                      </span>
                    </div>

                    <p className="text-xs text-purple-300 font-semibold mb-3">{edu.institution}</p>
                    {edu.details && <p className="text-xs text-gray-400 leading-relaxed mb-3">{edu.details}</p>}

                    <div className="flex flex-wrap gap-1.5">
                      {edu.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] text-gray-400 hover:text-white transition duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
