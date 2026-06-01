import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveMessage, saveLead } from '../data/storage';
import { FiverrIcon } from './Services';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      saveMessage(formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  // Logging WhatsApp CTA clicks in leads database
  const handleWhatsAppClick = () => {
    saveLead({
      type: 'WhatsApp Direct Click',
      clientName: 'Anonymous Visitor',
      clientContact: '+94 771 813 023',
      details: 'Clicked WhatsApp direct consult button.'
    });
  };

  // Logging Fiverr clicks in leads database
  const handleFiverrClick = () => {
    saveLead({
      type: 'Fiverr Referral Click',
      clientName: 'Anonymous Visitor',
      clientContact: 'Fiverr External Profile',
      details: 'Clicked Fiverr profile link on contact page.'
    });
  };

  return (
    <section className="min-h-screen py-12 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-900/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-4">
            Let's Build Something Great
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Have a project in mind, looking for a software developer, or just want to connect? Reach out and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-5 items-stretch">
          
          {/* Contact Details Column */}
          <motion.div 
            className="md:col-span-2 flex flex-col justify-between p-8 rounded-2xl glass-panel relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-white tracking-tight">Contact Information</h3>
              <p className="text-gray-400 mb-8 text-xs sm:text-sm leading-relaxed">
                Feel free to contact me via email, phone, or direct WhatsApp. I am always open to discussing new software development initiatives, freelance jobs, and exciting tech collaborations.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-600/10 border border-purple-500/20 text-purple-400 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Email Me</h4>
                    <a href="mailto:umarxgamer04@gmail.com" className="text-sm text-gray-200 hover:text-purple-400 transition break-all">
                      umarxgamer04@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-600/10 border border-pink-500/20 text-pink-400 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Call Me</h4>
                    <a href="tel:0771813023" className="text-sm text-gray-200 hover:text-pink-400 transition">
                      0771813023
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-600/10 border border-red-500/20 text-red-400 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Country</h4>
                    <span className="text-sm text-gray-200">Sri Lanka</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Call to Action */}
              <div className="mt-8">
                <a
                  href="https://wa.me/94771813023?text=Hi%20Umar,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20consult%20on%20a%20project!"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition duration-300 shadow-md hover:shadow-emerald-500/20"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.896 14.11 1.87 11.77 1.87c-5.437 0-9.862 4.42-9.866 9.865-.001 1.739.467 3.435 1.353 4.931l-.995 3.635 3.73-.977c1.47.801 2.87 1.22 4.065 1.22zM17.65 14.6c-.287-.143-1.695-.838-1.955-.933-.26-.095-.45-.143-.64.143-.19.287-.736.933-.903 1.124-.167.19-.334.214-.621.071-.287-.143-1.21-.446-2.305-1.424-.853-.761-1.43-1.7-1.597-1.986-.167-.287-.018-.442.125-.584.13-.127.287-.334.43-.5.143-.167.19-.286.287-.476.095-.19.047-.357-.024-.5-.071-.143-.64-1.543-.877-2.114-.23-.553-.464-.477-.64-.486-.167-.008-.357-.01-.548-.01s-.5.071-.762.357c-.262.287-1 1-.98 2.452.02 1.452.923 2.857 1.047 3.024.124.167 2.05 3.129 4.966 4.385.694.3 1.236.478 1.659.613.698.223 1.334.19 1.838.115.561-.083 1.695-.69 1.935-1.357.24-.667.24-1.238.167-1.357-.073-.119-.262-.19-.548-.333z"/>
                  </svg>
                  Consult on WhatsApp
                </a>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                <a 
                  id="contact-github-link"
                  href="https://github.com/umarpsycho3-source" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-gray-400 hover:text-purple-400 rounded-xl transition duration-300 transform hover:-translate-y-1"
                  title="View GitHub Profile"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </a>
                <a 
                  id="contact-linkedin-link"
                  href="http://www.linkedin.com/in/mohamad-umar-suiiii7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-gray-400 hover:text-purple-400 rounded-xl transition duration-300 transform hover:-translate-y-1"
                  title="View LinkedIn Profile"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  id="contact-fiverr-link"
                  href="https://fiverr.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={handleFiverrClick}
                  className="p-3 bg-white/5 hover:bg-emerald-600/20 border border-white/10 hover:border-emerald-500/40 text-gray-400 hover:text-emerald-400 rounded-xl transition duration-300 transform hover:-translate-y-1"
                  title="Visit Fiverr Store"
                >
                  <FiverrIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div 
            className="md:col-span-3 p-8 rounded-2xl glass-panel relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg glass-input text-white ${errors.name ? 'border-red-500/50 focus:border-red-500 focus:shadow-red-500/20' : ''}`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg glass-input text-white ${errors.email ? 'border-red-500/50 focus:border-red-500 focus:shadow-red-500/20' : ''}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg glass-input text-white ${errors.subject ? 'border-red-500/50 focus:border-red-500 focus:shadow-red-500/20' : ''}`}
                      placeholder="Project Inquiries / Custom Request"
                    />
                    {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg glass-input text-white resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500 focus:shadow-red-500/20' : ''}`}
                      placeholder="Tell me about your project, idea, or request..."
                    ></textarea>
                    {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    id="submit-message-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-purple-700 disabled:to-pink-700 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-lg hover:shadow-purple-500/25 transition duration-300 transform active:scale-98 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-screen"
                  className="flex flex-col items-center justify-center text-center py-16"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
                    Thank you for reaching out. Your message has been saved. I will review it and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition duration-200"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
