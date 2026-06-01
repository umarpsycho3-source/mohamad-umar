import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { getProjects } from "../data/storage";

export default function Projects() {
  const [projectList] = useState(() => getProjects());

  return (
    <section className="min-h-screen py-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h2>
      
      <p className="text-gray-400 text-center mb-12 max-w-lg mx-auto">
        A curated showcase of recent full-stack systems, professional software applications, and interactive web tools.
      </p>

      {projectList.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          No projects found. Check back later or add some in the Admin Dashboard!
        </div>
      ) : (
        <div className="grid gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {projectList.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}
