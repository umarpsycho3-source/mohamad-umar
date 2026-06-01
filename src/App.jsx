import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import AdminDashboard from './admin/Dashboard';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-950/70 backdrop-blur-md border-b border-white/5 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 hover:opacity-90 transition duration-300"
        >
          Umar Portfolio
        </Link>
        <ul className="flex items-center gap-2 sm:gap-4">
          <NavEntry to="/about" label="About" />
          <NavEntry to="/skills" label="Skills" />
          <NavEntry to="/services" label="Services" />
          <NavEntry to="/projects" label="Projects" />
          <NavEntry to="/contact" label="Contact" />
          <NavEntry to="/admin" label="Admin" isSpecial />
        </ul>
      </div>
    </nav>
  );
}

function NavEntry({ to, label, isSpecial }) {
  return (
    <li>
      <Link
        to={to}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition duration-200 block ${
          isSpecial
            ? 'bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 border border-purple-500/20'
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        {label}
      </Link>
    </li>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <Navbar />
        <main className="pt-20 flex-grow">
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
