import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import AdminDashboard from './admin/Dashboard';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-950/70 backdrop-blur-md border-b border-white/5 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 hover:opacity-90 transition duration-300"
          >
            Umar Portfolio
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-white"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>

          <ul className="hidden md:flex items-center gap-2 lg:gap-4">
            <NavEntry to="/about" label="About" />
            <NavEntry to="/skills" label="Skills" />
            <NavEntry to="/services" label="Services" />
            <NavEntry to="/projects" label="Projects" />
            <NavEntry to="/contact" label="Contact" />
            <NavEntry to="/admin" label="Admin" isSpecial />
          </ul>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 mt-3' : 'max-h-0'}`}>
          <ul className="grid gap-2 rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-xl">
            <NavEntry to="/about" label="About" mobile onClick={() => setIsMenuOpen(false)} />
            <NavEntry to="/skills" label="Skills" mobile onClick={() => setIsMenuOpen(false)} />
            <NavEntry to="/services" label="Services" mobile onClick={() => setIsMenuOpen(false)} />
            <NavEntry to="/projects" label="Projects" mobile onClick={() => setIsMenuOpen(false)} />
            <NavEntry to="/contact" label="Contact" mobile onClick={() => setIsMenuOpen(false)} />
            <NavEntry to="/admin" label="Admin" isSpecial mobile onClick={() => setIsMenuOpen(false)} />
          </ul>
        </div>
      </div>
    </nav>
  );
}

function NavEntry({ to, label, isSpecial, mobile = false, onClick }) {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition duration-200 block ${
          isSpecial
            ? 'bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 border border-purple-500/20'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        } ${mobile ? 'w-full text-center py-3' : ''}`}
      >
        {label}
      </Link>
    </li>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-x-hidden">
        <Navbar />
        <main className="pt-24 md:pt-20 flex-grow overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>

        <footer className="border-t border-white/5 bg-slate-950 py-8 text-center text-xs text-gray-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Umar. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/about" className="hover:text-gray-300 transition">
                About
              </Link>
              <Link to="/services" className="hover:text-gray-300 transition">
                Services
              </Link>
              <Link to="/contact" className="hover:text-gray-300 transition">
                Get in Touch
              </Link>
              <Link to="/admin" className="hover:text-gray-300 transition">
                Dashboard
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
