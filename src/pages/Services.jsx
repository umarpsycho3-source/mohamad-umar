import { useState } from 'react';
import { motion } from 'framer-motion';
import { getServices, saveLead } from '../data/storage';

// Beautiful custom Fiverr icon in green
export function FiverrIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M23 0H1a1 1 0 00-1 1v22a1 1 0 001 1h22a1 1 0 001-1V1a1 1 0 00-1-1zm-6.8 17.2h-2.3v-4.8c0-1.2-.9-1.2-1.2-1.2s-1.2 0-1.2 1.2v4.8H9.2V9.8h2.3v1c.5-.7 1.3-1.2 2.3-1.2 1.8 0 2.4 1.3 2.4 3v4.6zm-8.7 0H5.2V9.8h2.3v7.4zM6.4 8.2c-.7 0-1.3-.6-1.3-1.3S5.7 5.6 6.4 5.6s1.3.6 1.3 1.3c0 .8-.6 1.3-1.3 1.3zm12.3 0c-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3 1.3.6 1.3 1.3-.6 1.3-1.3 1.3z" />
    </svg>
  );
}

export default function Services() {
  const [servicesList] = useState(() => getServices());

  const handleOrderClick = (serviceTitle) => {
    saveLead({
      type: 'Fiverr Redirect',
      clientName: 'Anonymous Visitor',
      clientContact: 'Services Tab',
      details: `Clicked "Order on Fiverr" for ${serviceTitle}.`
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="min-h-screen py-16 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative">
      {/* Background highlight glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <FiverrIcon className="w-3.5 h-3.5" />
            Fiverr Freelance Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-4">
            Custom Digital Solutions
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Developing premium systems, custom websites, and creative assets designed to establish and grow your business online.
          </p>
        </motion.div>

        {servicesList.length === 0 ? (
          <div className="p-12 text-center text-gray-500 glass-panel rounded-2xl">
            No services configured at the moment.
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {servicesList.map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="p-6 rounded-2xl glass-panel relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/30 transition duration-300 shadow-xl"
                whileHover={{ y: -4 }}
              >
                {/* Visual Glow on Group Hover */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/2 rounded-full blur-2xl group-hover:bg-emerald-600/5 transition duration-300 pointer-events-none"></div>

                <div>
                  {/* Title & Badge */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-400 transition leading-snug">{service.title}</h3>
                    <span className="shrink-0 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold tracking-wide">
                      {service.price}
                    </span>
                  </div>

                  <p className="text-gray-400 text-xs leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Pricing Details */}
                  <div className="flex items-center gap-2 mb-6 text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    <span>Delivery: {service.deliveryTime}</span>
                    <span className="text-gray-700">•</span>
                    <span>Unlimited Revisions</span>
                  </div>

                  {/* Bullet features */}
                  <ul className="space-y-2 mb-8 text-xs text-gray-300">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fiverr CTA Link Button */}
                <a
                  href={service.fiverrLink || "https://www.fiverr.com/s/387W8VL"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleOrderClick(service.title)}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition duration-300 shadow-md group-hover:shadow-emerald-500/20"
                >
                  <FiverrIcon className="w-4 h-4" />
                  Order on Fiverr
                </a>

              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Fiverr General Consultation CTA Panel */}
        <motion.div
          className="mt-16 p-8 rounded-3xl glass-panel text-center max-w-3xl mx-auto relative overflow-hidden group border border-emerald-500/10 hover:border-emerald-500/25 transition duration-500"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <h3 className="text-xl sm:text-2xl font-bold mb-3">Looking for a Customized Tech Solution?</h3>
          <p className="text-xs sm:text-sm text-gray-400 mb-6 max-w-xl mx-auto leading-relaxed">
            Need custom features, custom databases, or specialized system flows? Send me a custom inquiry and I will build a tailored solution specifically for your business workflow.
          </p>
          <a
            href="https://www.fiverr.com/s/387W8VL?source=services_tab"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleOrderClick('Custom Consultation')}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-purple-500/25 transition duration-300 transform hover:-translate-y-0.5"
          >
            Request Custom Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
