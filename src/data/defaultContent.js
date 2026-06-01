export const defaultServices = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Professional business websites, modern landing pages, and responsive portfolio websites tailored to represent your brand.',
    price: '$99',
    deliveryTime: '3-5 Days',
    features: ['Responsive Layouts', 'Modern Animations', 'SEO Friendly Structure', 'Source Code Included'],
    fiverrLink: 'https://www.fiverr.com/s/387W8VL'
  },
  {
    id: 2,
    title: 'Full-Stack Development',
    description: 'Developing complete, highly scalable web applications and web systems with advanced front-end and robust back-end integrations.',
    price: '$249',
    deliveryTime: '7-10 Days',
    features: ['Database Architecture', 'REST API Development', 'Secure Session Authentication', 'Dynamic Frontend UI'],
    fiverrLink: 'https://www.fiverr.com/s/387W8VL'
  },
  {
    id: 3,
    title: 'Software Development',
    description: 'Designing and building custom software solutions, POS systems, management platforms, and inventory workflows.',
    price: '$299',
    deliveryTime: '10-14 Days',
    features: ['Custom Dashboard Analytics', 'Inventory Tracking', 'Advanced CRUD Operations', 'Secure Roles & Auth'],
    fiverrLink: 'https://www.fiverr.com/s/387W8VL'
  },
  {
    id: 4,
    title: 'Graphic Design',
    description: 'High-quality, eye-catching social media posts, custom banners, vector elements, and premium brand visuals.',
    price: '$29',
    deliveryTime: '1-2 Days',
    features: ['Modern Visual Aesthetics', 'High Resolution Output', 'Unlimited Revisions', 'Source Files Provided'],
    fiverrLink: 'https://www.fiverr.com/s/387W8VL'
  },
  {
    id: 5,
    title: 'Portfolio Building',
    description: 'Helping students and professionals build state-of-the-art interactive digital portfolios to stand out in front of employers.',
    price: '$79',
    deliveryTime: '3-4 Days',
    features: ['Modern Glassmorphism UI', 'Dynamic Content Management', 'Deployable Codebase', 'Mobile Responsiveness'],
    fiverrLink: 'https://www.fiverr.com/s/387W8VL'
  }
];

export const defaultEducation = [
  {
    id: 1,
    title: 'Diploma in Information Technology',
    status: 'Completed',
    institution: 'Information Technology Institute',
    description: 'Built a solid foundation in Programming Fundamentals, Database Management, Web Development, Networking, Software Concepts, and System Development.'
  },
  {
    id: 2,
    title: 'English Qualification',
    status: 'Completed',
    institution: 'Language Academy',
    description: 'Intensively improved Professional Communication, Business Writing Skills, Speaking Fluency, and Business Correspondence.'
  },
  {
    id: 3,
    title: 'Higher National Diploma (HND) in Information Technology',
    status: 'Currently Studying (Semester 4)',
    institution: 'Sri Lanka Institute of IT / HND Center',
    description: 'Focusing on Software Engineering, System Analysis & Design, Web Development, Database Systems, SDLC Methodologies, and Project Management.'
  },
  {
    id: 4,
    title: 'Future Degree Pathway',
    status: 'Planned',
    institution: 'Software Engineering Undergraduate BSc (Hons)',
    description: 'Pursuing a Bachelor\'s Degree in Software Engineering / Information Technology to strengthen capabilities in advanced software architecture, systems engineering, and enterprise practices.'
  }
];

export const defaultLeads = [
  {
    id: 1,
    type: 'Fiverr Inquiry',
    clientName: 'Sarah Jenkins (Fiverr Client)',
    clientContact: 'sarah_jk@fiverr.com',
    details: 'Requested a full-stack POS Management System with secure authentication.',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'Actioned'
  },
  {
    id: 2,
    type: 'WhatsApp Direct Click',
    clientName: 'Local Business Partner',
    clientContact: '+94 771 813 023',
    details: 'Clicked WhatsApp CTA to consult on corporate portfolio building.',
    date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    status: 'New'
  }
];
