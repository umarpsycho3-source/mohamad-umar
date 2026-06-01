import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { saveLead } from '../data/storage';
import { FiverrIcon } from './Services';

const solutions = [
  'POS Management Systems',
  'Custom Web Applications',
  'Responsive Business Websites',
  'Modern E-Commerce Portals',
  'Sleek UI/UX Brand Designs',
  'Optimized Software Solutions'
];

const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDelay = 1500;

function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullText = solutions[currentTextIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText((prev) => prev.slice(0, -1));
        if (typedText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % solutions.length);
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
        if (typedText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), pauseDelay);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentTextIndex]);

  const handleHireMeClick = () => {
    saveLead({
      type: 'CTA Click',
      clientName: 'Anonymous Visitor',
      clientContact: 'Home CTA Click',
      details: 'Clicked "Hire Me" CTA on the hero section.'
    });
  };

  const handleFiverrClick = () => {
    saveLead({
      type: 'Fiverr Hero Click',
      clientName: 'Anonymous Visitor',
      clientContact: 'Home Hero CTA',
      details: 'Clicked Fiverr profile button on the hero section.'
    });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center text-white overflow-hidden py-12 px-6">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-600/10 blur-[130px] animate-pulse-glow z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-pink-600/10 blur-[130px] animate-pulse-glow z-0"></div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 gap-10 md:gap-12 md:grid-cols-12 items-center z-10 w-full">
        <div className="md:col-span-7 space-y-5 sm:space-y-6 text-center md:text-left w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block max-w-full px-4 py-1.5 rounded-full glass-panel text-[11px] sm:text-xs text-purple-400 font-bold tracking-wide"
          >
            BEng (Hons) Software Engineering Undergraduate
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white break-words max-w-full mx-auto md:mx-0">
            Hi, I&apos;m{' '}
            <span className="block sm:inline bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
              Umar
            </span>
          </h1>

          <div className="space-y-4 w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-medium text-purple-300 leading-relaxed max-w-xl mx-auto md:mx-0">
              Software Engineering Student | Full-Stack Developer | Freelancer | IT Professional
            </h2>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0 px-2 sm:px-0">
              I am passionate about developing innovative digital solutions, modern websites, and software systems.
              Currently studying Information Technology and Software Engineering while working as a freelancer helping
              businesses build their digital presence.
            </p>

            <div className="max-w-2xl mx-auto md:mx-0 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-gray-500 border-b border-white/5">
                What I deliver
              </div>
              <div className="overflow-hidden">
                <div className="flex w-max items-center gap-3 px-4 py-3 animate-marquee text-xs sm:text-sm md:text-base font-semibold text-gray-200">
                  <span>Business websites</span>
                  <span className="text-purple-400">•</span>
                  <span>Full-stack web apps</span>
                  <span className="text-purple-400">•</span>
                  <span>POS systems</span>
                  <span className="text-purple-400">•</span>
                  <span>UI/UX design</span>
                  <span className="text-purple-400">•</span>
                  <span>Client dashboards</span>
                  <span className="text-purple-400">•</span>
                  <span>Custom digital solutions</span>
                  <span className="text-purple-400">•</span>
                  <span>Business websites</span>
                  <span className="text-purple-400">•</span>
                  <span>Full-stack web apps</span>
                  <span className="text-purple-400">•</span>
                  <span>POS systems</span>
                  <span className="text-purple-400">•</span>
                  <span>UI/UX design</span>
                  <span className="text-purple-400">•</span>
                  <span>Client dashboards</span>
                  <span className="text-purple-400">•</span>
                  <span>Custom digital solutions</span>
                </div>
              </div>
            </div>

          <div className="h-auto flex flex-wrap justify-center md:justify-start items-center gap-2">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Delivering:</span>
            <span className="text-base sm:text-lg font-bold text-pink-400 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-400">
              {typedText}
            </span>
            <span className="w-1.5 h-5 bg-pink-400 animate-pulse rounded-full"></span>
          </div>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap justify-center md:justify-start gap-3 pt-4">
            <Link
              to="/projects"
              className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 transition duration-300 transform hover:-translate-y-0.5 text-center"
            >
              View Projects
            </Link>

            <Link
              to="/contact"
              onClick={handleHireMeClick}
              className="w-full lg:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl border border-white/15 hover:border-white/20 transition duration-300 transform hover:-translate-y-0.5 text-center"
            >
              Hire Me
            </Link>

            <a
              href="/resume.pdf"
              download
              className="w-full lg:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-sm font-bold rounded-xl border border-white/15 hover:border-white/20 transition duration-300 transform hover:-translate-y-0.5 text-center"
            >
              Download CV
            </a>

            <Link
              to="/contact"
              className="w-full lg:w-auto px-6 py-3 bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 hover:text-purple-300 text-sm font-bold rounded-xl border border-purple-500/20 hover:border-purple-500/30 transition duration-300 transform hover:-translate-y-0.5 text-center"
            >
              Contact Me
            </Link>

            <a
              href="https://www.fiverr.com/s/387W8VL"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleFiverrClick}
              className="w-full lg:w-auto px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-emerald-200 text-sm font-bold rounded-xl border border-emerald-500/20 hover:border-emerald-500/30 transition duration-300 transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 text-center"
            >
              <FiverrIcon className="w-4 h-4" />
              Fiverr Profile
            </a>
          </div>
        </div>

        <div className="hidden md:flex md:col-span-5 justify-center items-center">
          <motion.div
            className="relative p-3 rounded-3xl glass-panel relative overflow-hidden group shadow-2xl w-full max-w-[280px] sm:max-w-sm"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

            <img
              src="/avatar.png"
              alt="Umar Portrait"
              className="w-full h-72 sm:h-80 object-cover rounded-2xl bg-slate-900 border border-white/5"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Home;
