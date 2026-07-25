import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '..', 'data', 'subscribers.json');

interface Subscriber {
  email: string;
  subscribedAt: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readSubscribers(): Subscriber[] {
  if (!existsSync(DATA_FILE)) return [];
  return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
}

function writeSubscribers(subscribers: Subscriber[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(subscribers, null, 2));
}

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.get('/api/_healthcheck', (_req, res) => {
  res.json({ message: 'Success' });
});

app.post('/api/newsletter/subscribe', (req, res) => {
  const { email } = (req.body ?? {}) as { email?: string };
  const trimmed = (email ?? '').trim().toLowerCase();

  if (!trimmed || !EMAIL_REGEX.test(trimmed)) {
    res.status(400).json({ error: 'Please enter a valid email address.' });
    return;
  }

  const subscribers = readSubscribers();
  const alreadySubscribed = subscribers.some((s) => s.email === trimmed);

  if (alreadySubscribed) {
    res.json({ subscribed: true, alreadySubscribed: true });
    return;
  }

  subscribers.push({ email: trimmed, subscribedAt: new Date().toISOString() });
  writeSubscribers(subscribers);

  res.json({ subscribed: true, alreadySubscribed: false });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});