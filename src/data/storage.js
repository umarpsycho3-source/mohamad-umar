import { projects as defaultProjects } from './projects';

export const FIVERR_PROFILE_URL = 'https://www.fiverr.com/s/387W8VL';

const PROJECTS_KEY = 'umar_portfolio_projects';
const MESSAGES_KEY = 'umar_portfolio_messages';
const SERVICES_KEY = 'umar_portfolio_services';
const EDUCATION_KEY = 'umar_portfolio_education';
const LEADS_KEY = 'umar_portfolio_leads';

const defaultServices = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Professional business websites, modern landing pages, and responsive portfolio websites tailored to represent your brand.',
    price: '$99',
    deliveryTime: '3-5 Days',
    features: ['Responsive Layouts', 'Modern Animations', 'SEO Friendly Structure', 'Source Code Included'],
    fiverrLink: FIVERR_PROFILE_URL
  },
  {
    id: 2,
    title: 'Full-Stack Development',
    description: 'Developing complete, highly scalable web applications and web systems with advanced front-end and robust back-end integrations.',
    price: '$249',
    deliveryTime: '7-10 Days',
    features: ['Database Architecture', 'REST API Development', 'Secure Session Authentication', 'Dynamic Frontend UI'],
    fiverrLink: FIVERR_PROFILE_URL
  },
  {
    id: 3,
    title: 'Software Development',
    description: 'Designing and building custom software solutions, POS systems, management platforms, and inventory workflows.',
    price: '$299',
    deliveryTime: '10-14 Days',
    features: ['Custom Dashboard Analytics', 'Inventory Tracking', 'Advanced CRUD Operations', 'Secure Roles & Auth'],
    fiverrLink: FIVERR_PROFILE_URL
  },
  {
    id: 4,
    title: 'Graphic Design',
    description: 'High-quality, eye-catching social media posts, custom banners, vector elements, and premium brand visuals.',
    price: '$29',
    deliveryTime: '1-2 Days',
    features: ['Modern Visual Aesthetics', 'High Resolution Output', 'Unlimited Revisions', 'Source Files Provided'],
    fiverrLink: FIVERR_PROFILE_URL
  },
  {
    id: 5,
    title: 'Portfolio Building',
    description: 'Helping students and professionals build state-of-the-art interactive digital portfolios to stand out in front of employers.',
    price: '$79',
    deliveryTime: '3-4 Days',
    features: ['Modern Glassmorphism UI', 'Dynamic Content Management', 'Deployable Codebase', 'Mobile Responsiveness'],
    fiverrLink: FIVERR_PROFILE_URL
  }
];

const defaultEducation = [
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

const defaultLeads = [
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

const hasStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const readJSON = (key, fallback) => {
  if (!hasStorage()) return fallback;
  const stored = window.localStorage.getItem(key);
  if (!stored) return fallback;
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error(`Error parsing ${key}`, error);
    return fallback;
  }
};

const writeJSON = (key, value) => {
  if (!hasStorage()) return value;
  window.localStorage.setItem(key, JSON.stringify(value));
  return value;
};

const normalizeProject = (project, fallbackId = null, fallbackCreatedAt = null) => ({
  ...project,
  id: Number(project.id ?? fallbackId),
  technologies: Array.isArray(project.technologies)
    ? project.technologies
    : String(project.technologies || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
  createdAt: project.createdAt || fallbackCreatedAt || new Date().toISOString(),
  completionDate: project.completionDate || new Date().toISOString().slice(0, 10)
});

const initializeProjects = () => {
  const initProjects = defaultProjects.map((project, index) =>
    normalizeProject(
      project,
      index + 1,
      project.createdAt || new Date().toISOString()
    )
  );
  return writeJSON(PROJECTS_KEY, initProjects);
};

export const getProjects = () => {
  const stored = readJSON(PROJECTS_KEY, null);
  if (!stored) return initializeProjects();

  const normalized = stored.map((project, index) =>
    normalizeProject(project, project.id || index + 1, project.createdAt)
  );
  const needsRepair = JSON.stringify(stored) !== JSON.stringify(normalized);
  if (needsRepair) writeJSON(PROJECTS_KEY, normalized);
  return normalized;
};

export const saveProject = (project) => {
  const current = getProjects();
  let updated;

  if (project.id) {
    updated = current.map((item) => {
      if (item.id !== Number(project.id)) return item;
      return normalizeProject(
        {
          ...item,
          ...project,
          id: Number(project.id),
          createdAt: item.createdAt
        },
        item.id,
        item.createdAt
      );
    });
  } else {
    const nextId = current.length > 0 ? Math.max(...current.map((item) => Number(item.id) || 0)) + 1 : 1;
    updated = [
      ...current,
      normalizeProject(
        {
          ...project,
          id: nextId,
          createdAt: new Date().toISOString()
        },
        nextId,
        new Date().toISOString()
      )
    ];
  }

  writeJSON(PROJECTS_KEY, updated);
  return updated;
};

export const deleteProject = (id) => {
  const current = getProjects();
  const updated = current.filter((project) => project.id !== Number(id));
  writeJSON(PROJECTS_KEY, updated);
  return updated;
};

export const getMessages = () => readJSON(MESSAGES_KEY, []);

export const saveMessage = (msg) => {
  const current = getMessages();
  const newMessage = {
    ...msg,
    id: Date.now(),
    date: new Date().toISOString(),
    status: 'New'
  };
  const updated = [newMessage, ...current];
  writeJSON(MESSAGES_KEY, updated);

  saveLead({
    type: 'Form Submission',
    clientName: msg.name,
    clientContact: msg.email,
    details: `${msg.subject} — ${msg.message}`,
    date: newMessage.date
  });

  return updated;
};

export const deleteMessage = (id) => {
  const current = getMessages();
  const updated = current.filter((message) => message.id !== id);
  writeJSON(MESSAGES_KEY, updated);
  return updated;
};

export const getServices = () => {
  const stored = readJSON(SERVICES_KEY, null);
  if (!stored) return writeJSON(SERVICES_KEY, defaultServices);

  const normalized = stored.map((service) => ({
    ...service,
    fiverrLink: FIVERR_PROFILE_URL
  }));

  const needsRepair = JSON.stringify(stored) !== JSON.stringify(normalized);
  if (needsRepair) writeJSON(SERVICES_KEY, normalized);
  return normalized;
};

export const saveService = (service) => {
  const current = getServices();
  let updated;

  if (service.id) {
    updated = current.map((item) =>
      item.id === Number(service.id) ? { ...item, ...service, id: Number(service.id) } : item
    );
  } else {
    const nextId = current.length > 0 ? Math.max(...current.map((item) => Number(item.id) || 0)) + 1 : 1;
    updated = [...current, { ...service, id: nextId }];
  }

  writeJSON(SERVICES_KEY, updated);
  return updated;
};

export const deleteService = (id) => {
  const current = getServices();
  const updated = current.filter((service) => service.id !== Number(id));
  writeJSON(SERVICES_KEY, updated);
  return updated;
};

export const getEducation = () => {
  const stored = readJSON(EDUCATION_KEY, null);
  if (!stored) return writeJSON(EDUCATION_KEY, defaultEducation);
  return stored;
};

export const saveEducation = (education) => {
  const current = getEducation();
  let updated;

  if (education.id) {
    updated = current.map((item) =>
      item.id === Number(education.id) ? { ...item, ...education, id: Number(education.id) } : item
    );
  } else {
    const nextId = current.length > 0 ? Math.max(...current.map((item) => Number(item.id) || 0)) + 1 : 1;
    updated = [...current, { ...education, id: nextId }];
  }

  writeJSON(EDUCATION_KEY, updated);
  return updated;
};

export const getLeads = () => {
  const stored = readJSON(LEADS_KEY, null);
  if (!stored) return writeJSON(LEADS_KEY, defaultLeads);
  return stored;
};

export const saveLead = (lead) => {
  const current = getLeads();
  const newLead = {
    ...lead,
    id: lead.id || Date.now(),
    date: lead.date || new Date().toISOString(),
    status: lead.status || 'New'
  };
  const updated = [newLead, ...current];
  writeJSON(LEADS_KEY, updated);
  return updated;
};

export const updateLeadStatus = (id, status) => {
  const current = getLeads();
  const updated = current.map((lead) => (lead.id === Number(id) ? { ...lead, status } : lead));
  writeJSON(LEADS_KEY, updated);
  return updated;
};

export const deleteLead = (id) => {
  const current = getLeads();
  const updated = current.filter((lead) => lead.id !== Number(id));
  writeJSON(LEADS_KEY, updated);
  return updated;
};
