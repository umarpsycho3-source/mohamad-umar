import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 10;
    const y = ((clientY - top) / height - 0.5) * -10;
    currentTarget.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  };

  const handleLeave = () => {
    const target = document.querySelector(`[data-project-id="${project.id}"]`);
    if (target) target.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <motion.div
      data-project-id={project.id}
      className="relative p-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:shadow-xl transition-shadow"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
      <p className="text-sm text-gray-300 mb-3">{project.shortDescription}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs bg-white/20 rounded text-white"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex space-x-2">
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-3 py-1 bg-primary/20 hover:bg-primary/30 rounded transition"
          >
            Live Demo
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-3 py-1 bg-accent/20 hover:bg-accent/30 rounded transition"
          >
            GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
}
