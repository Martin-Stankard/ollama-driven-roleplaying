import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
//copied from vibe infra start
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = () => {
    res.write(`data: Hello World! ${new Date().toLocaleTimeString()}\n\n`);
  };
  send();
  const interval = setInterval(send, 1000);

  req.on('close', () => clearInterval(interval));
});
//copied from vibe infra end
app.get('/api/ping/:target', (req, res) => {
  const { target } = req.params;
  let url = '';
  if (target === 'tts') url = 'http://tts:4010/ping';
  if (target === 'sound') url = 'http://sound:4011/ping';
  if (target === 'image') url = 'http://image:4012/ping';
  if (!url) return res.json({ error: 'Unknown stub target.' });
  // Use http.get for stub ping
  import('http').then(http => {
    http.get(url, (r) => {
      let data = '';
      r.on('data', chunk => data += chunk);
      r.on('end', () => res.json({ response: data }));
    }).on('error', () => res.json({ error: 'Error pinging ' + target }));
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
