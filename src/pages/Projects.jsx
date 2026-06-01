import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { getProjects } from "../data/storage";

export default function Projects() {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getProjects();
      setProjectList(data);
    })();
  }, []);


  return (
    <section className="min-h-screen py-10 sm:py-12 px-3 sm:px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h2>
      
      <p className="text-gray-400 text-center mb-10 sm:mb-12 max-w-lg mx-auto text-sm sm:text-base leading-relaxed px-2">
        A curated showcase of recent full-stack systems, professional software applications, and interactive web tools.
      </p>

      {projectList.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          No projects found. Check back later or add some in the Admin Dashboard!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {projectList.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}
