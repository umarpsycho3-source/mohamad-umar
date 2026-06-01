import { projects as defaultProjects } from './projects';
import { defaultEducation, defaultLeads, defaultServices } from './defaultContent';

const COLLECTION_KEYS = {
  projects: 'umar_portfolio_projects',
  messages: 'umar_portfolio_messages',
  services: 'umar_portfolio_services',
  education: 'umar_portfolio_education',
  leads: 'umar_portfolio_leads'
};

const REMOTE_COLLECTIONS = new Set(['projects', 'messages', 'services', 'education', 'leads']);
const USE_REMOTE_API = import.meta.env.PROD;

const hasWindow = () => typeof window !== 'undefined';

const apiFetch = async (path, options = {}) => {
  const response = await fetch(`/api${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }

  return response.status === 204 ? null : response.json();
};

const readCache = (key, fallback) => {
  if (!hasWindow()) return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error parsing ${key}`, error);
    return fallback;
  }
};

const writeCache = (key, value) => {
  if (!hasWindow()) return value;
  window.localStorage.setItem(key, JSON.stringify(value));
  return value;
};

const normalizeProject = (project, fallbackId = null) => ({
  ...project,
  id: Number(project.id ?? fallbackId),
  image:
    project.image === '/projects/pos.png'
      ? '/projects/pos.svg'
      : project.image === '/projects/portfolio.png'
        ? '/projects/portfolio.svg'
        : project.image === '/projects/restaurant.png'
          ? '/projects/aurora.svg'
          : project.image,
  technologies: Array.isArray(project.technologies)
    ? project.technologies
    : String(project.technologies || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
  createdAt: project.createdAt || new Date().toISOString(),
  completionDate: project.completionDate || new Date().toISOString().slice(0, 10)
});

const normalizeService = (service, fallbackId = null) => ({
  ...service,
  id: Number(service.id ?? fallbackId),
  features: Array.isArray(service.features)
    ? service.features
    : String(service.features || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
  fiverrLink: service.fiverrLink || 'https://www.fiverr.com/s/387W8VL'
});

const normalizeEducation = (education, fallbackId = null) => ({
  ...education,
  id: Number(education.id ?? fallbackId)
});

const normalizeLead = (lead, fallbackId = null) => ({
  ...lead,
  id: Number(lead.id ?? fallbackId),
  date: lead.date || new Date().toISOString(),
  status: lead.status || 'New'
});

const normalizeMessage = (msg, fallbackId = null) => ({
  ...msg,
  id: Number(msg.id ?? fallbackId),
  date: msg.date || new Date().toISOString(),
  status: msg.status || 'New'
});

const mergeById = (remoteList, localList, normalizer) => {
  const merged = new Map();
  remoteList.map(normalizer).forEach((item) => merged.set(Number(item.id), item));
  localList.map(normalizer).forEach((item) => merged.set(Number(item.id), item));
  return Array.from(merged.values()).sort((a, b) => Number(a.id) - Number(b.id));
};

const getLocalSeed = (collection) => {
  switch (collection) {
    case 'projects':
      return defaultProjects;
    case 'services':
      return defaultServices;
    case 'education':
      return defaultEducation;
    case 'leads':
      return defaultLeads;
    case 'messages':
    default:
      return [];
  }
};

const getNormalizer = (collection) => {
  switch (collection) {
    case 'projects':
      return normalizeProject;
    case 'services':
      return normalizeService;
    case 'education':
      return normalizeEducation;
    case 'leads':
      return normalizeLead;
    case 'messages':
    default:
      return normalizeMessage;
  }
};

const getCacheKey = (collection) => COLLECTION_KEYS[collection];

const loadCollectionLocal = (collection) => {
  const cacheKey = getCacheKey(collection);
  const seed = getLocalSeed(collection);
  const normalizer = getNormalizer(collection);
  const stored = readCache(cacheKey, null);
  if (!stored) {
    const seeded = seed.map((item, index) => normalizer(item, index + 1));
    writeCache(cacheKey, seeded);
    return seeded;
  }

  const normalized = stored.map((item, index) => normalizer(item, index + 1));
  writeCache(cacheKey, normalized);
  return normalized;
};

const saveCollectionLocal = (collection, items) => {
  const normalizer = getNormalizer(collection);
  const normalized = items.map((item, index) => normalizer(item, index + 1));
  writeCache(getCacheKey(collection), normalized);
  return normalized;
};

const loadCollectionRemote = async (collection) => {
  const remote = await apiFetch(`/collections/${collection}`);
  const remoteList = Array.isArray(remote?.items) ? remote.items : [];
  const localList = readCache(getCacheKey(collection), []);
  const normalizer = getNormalizer(collection);
  const merged = mergeById(remoteList, localList, normalizer);

  const seed = getLocalSeed(collection);
  const finalList = merged.length > 0 ? merged : seed.map((item, index) => normalizer(item, index + 1));

  if (JSON.stringify(finalList) !== JSON.stringify(remoteList)) {
    await apiFetch(`/collections/${collection}`, {
      method: 'PUT',
      body: JSON.stringify({ items: finalList })
    });
  }

  writeCache(getCacheKey(collection), finalList);
  return finalList;
};

const saveCollectionRemote = async (collection, items) => {
  const normalizer = getNormalizer(collection);
  const normalized = items.map((item, index) => normalizer(item, index + 1));
  await apiFetch(`/collections/${collection}`, {
    method: 'PUT',
    body: JSON.stringify({ items: normalized })
  });
  writeCache(getCacheKey(collection), normalized);
  return normalized;
};

const createNextId = (items) => {
  if (items.length === 0) return 1;
  return Math.max(...items.map((item) => Number(item.id) || 0)) + 1;
};

export const getProjects = async () => {
  return USE_REMOTE_API ? loadCollectionRemote('projects') : loadCollectionLocal('projects');
};

export const saveProject = async (project) => {
  const current = await getProjects();
  let updated;

  if (project.id) {
    updated = current.map((item) => (item.id === Number(project.id) ? normalizeProject({ ...item, ...project }, item.id) : item));
  } else {
    const nextId = createNextId(current);
    updated = [...current, normalizeProject({ ...project, id: nextId, createdAt: new Date().toISOString() }, nextId)];
  }

  return USE_REMOTE_API ? saveCollectionRemote('projects', updated) : saveCollectionLocal('projects', updated);
};

export const deleteProject = async (id) => {
  const current = await getProjects();
  const updated = current.filter((item) => item.id !== Number(id));
  return USE_REMOTE_API ? saveCollectionRemote('projects', updated) : saveCollectionLocal('projects', updated);
};

export const getMessages = async () => {
  return USE_REMOTE_API ? loadCollectionRemote('messages') : loadCollectionLocal('messages');
};

export const saveMessage = async (msg) => {
  const current = await getMessages();
  const newMessage = normalizeMessage({
    ...msg,
    id: Date.now(),
    date: new Date().toISOString(),
    status: 'New'
  });
  const updated = [newMessage, ...current];

  await (USE_REMOTE_API ? saveCollectionRemote('messages', updated) : saveCollectionLocal('messages', updated));

  await saveLead({
    type: 'Form Submission',
    clientName: msg.name,
    clientContact: msg.email,
    details: `${msg.subject} — ${msg.message}`,
    date: newMessage.date
  });

  return updated;
};

export const deleteMessage = async (id) => {
  const current = await getMessages();
  const updated = current.filter((item) => item.id !== Number(id));
  return USE_REMOTE_API ? saveCollectionRemote('messages', updated) : saveCollectionLocal('messages', updated);
};

export const getServices = async () => {
  return USE_REMOTE_API ? loadCollectionRemote('services') : loadCollectionLocal('services');
};

export const saveService = async (service) => {
  const current = await getServices();
  let updated;

  if (service.id) {
    updated = current.map((item) => (item.id === Number(service.id) ? normalizeService({ ...item, ...service }, item.id) : item));
  } else {
    const nextId = createNextId(current);
    updated = [...current, normalizeService({ ...service, id: nextId }, nextId)];
  }

  return USE_REMOTE_API ? saveCollectionRemote('services', updated) : saveCollectionLocal('services', updated);
};

export const deleteService = async (id) => {
  const current = await getServices();
  const updated = current.filter((item) => item.id !== Number(id));
  return USE_REMOTE_API ? saveCollectionRemote('services', updated) : saveCollectionLocal('services', updated);
};

export const getEducation = async () => {
  return USE_REMOTE_API ? loadCollectionRemote('education') : loadCollectionLocal('education');
};

export const saveEducation = async (education) => {
  const current = await getEducation();
  let updated;

  if (education.id) {
    updated = current.map((item) => (item.id === Number(education.id) ? normalizeEducation({ ...item, ...education }, item.id) : item));
  } else {
    const nextId = createNextId(current);
    updated = [...current, normalizeEducation({ ...education, id: nextId }, nextId)];
  }

  return USE_REMOTE_API ? saveCollectionRemote('education', updated) : saveCollectionLocal('education', updated);
};

export const getLeads = async () => {
  return USE_REMOTE_API ? loadCollectionRemote('leads') : loadCollectionLocal('leads');
};

export const saveLead = async (lead) => {
  const current = await getLeads();
  const newLead = normalizeLead({
    ...lead,
    id: lead.id || Date.now(),
    date: lead.date || new Date().toISOString(),
    status: lead.status || 'New'
  });
  const updated = [newLead, ...current];
  return USE_REMOTE_API ? saveCollectionRemote('leads', updated) : saveCollectionLocal('leads', updated);
};

export const updateLeadStatus = async (id, status) => {
  const current = await getLeads();
  const updated = current.map((item) => (item.id === Number(id) ? { ...item, status } : item));
  return USE_REMOTE_API ? saveCollectionRemote('leads', updated) : saveCollectionLocal('leads', updated);
};

export const deleteLead = async (id) => {
  const current = await getLeads();
  const updated = current.filter((item) => item.id !== Number(id));
  return USE_REMOTE_API ? saveCollectionRemote('leads', updated) : saveCollectionLocal('leads', updated);
};
