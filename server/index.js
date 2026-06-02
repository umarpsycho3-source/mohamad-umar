import express from 'express';
import fs from 'fs';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';
import { projects as defaultProjects } from '../src/data/projects.js';
import { defaultEducation, defaultLeads, defaultServices } from '../src/data/defaultContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const app = express();
const port = Number(process.env.PORT || 10000);
const useDatabase = Boolean(process.env.DATABASE_URL);

const pool = useDatabase
  ? new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
  })
  : null;

const COLLECTIONS = new Set(['projects', 'messages', 'services', 'education', 'leads']);

const getSeedForCollection = (collection) => {
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

const ensureDatabase = async () => {
  if (!pool) return;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS portfolio_state (
      key text PRIMARY KEY,
      value jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    )
  `);

  for (const collection of COLLECTIONS) {
    const existing = await pool.query('SELECT 1 FROM portfolio_state WHERE key = $1', [collection]);
    if (existing.rowCount === 0) {
      await pool.query(
        'INSERT INTO portfolio_state (key, value) VALUES ($1, $2)',
        [collection, { items: getSeedForCollection(collection) }]
      );
    }
  }
};

const normalizeItems = (items) => (Array.isArray(items) ? items : []);

app.use(express.json({ limit: '2mb' }));

app.get('/api/health', async (_req, res) => {
  res.json({
    ok: true,
    database: Boolean(pool)
  });
});

// Simple status endpoint to help debugging deploys
app.get('/api/status', async (_req, res) => {
  try {
    const dbOk = Boolean(pool);
    let dbInfo = null;
    if (pool) {
      const result = await pool.query("SELECT to_char(max(updated_at), 'YYYY-MM-DD HH24:MI:SS') as last_update FROM portfolio_state");
      dbInfo = { lastUpdate: result.rows[0]?.last_update || null };
    }
    res.json({ ok: true, database: dbOk, dbInfo });
  } catch (err) {
    console.warn('Status check failed', err);
    res.status(500).json({ ok: false, error: String(err) });
  }
});

app.get('/api/collections/:collection', async (req, res) => {
  const { collection } = req.params;
  if (!COLLECTIONS.has(collection)) {
    return res.status(404).json({ error: 'Unknown collection' });
  }

  if (!pool) {
    return res.json({ items: getSeedForCollection(collection) });
  }

  const result = await pool.query('SELECT value FROM portfolio_state WHERE key = $1', [collection]);
  const value = result.rows[0]?.value;
  const items = normalizeItems(value?.items);
  return res.json({ items });
});

app.put('/api/collections/:collection', async (req, res) => {
  const { collection } = req.params;
  if (!COLLECTIONS.has(collection)) {
    return res.status(404).json({ error: 'Unknown collection' });
  }

  const items = normalizeItems(req.body?.items);

  if (!pool) {
    return res.json({ items });
  }

  await pool.query(
    `
      INSERT INTO portfolio_state (key, value, updated_at)
      VALUES ($1, $2, now())
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value, updated_at = now()
    `,
    [collection, { items }]
  );

  return res.json({ items });
});

app.use(express.static(distDir, { extensions: ['html'] }));

app.use((_req, res) => {
  const indexPath = path.join(distDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    const html = fs.readFileSync(indexPath, 'utf8');
    res.type('html').send(html);
  } else {
    res.status(404).send('Build output not found.');
  }
});

ensureDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database', error);
    process.exit(1);
  });
