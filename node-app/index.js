import { spawn } from 'child_process';
import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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

app.get('/api/ping/:target', (req, res) => {
  const { target } = req.params;
  let url = '';
  if (target === 'tts') url = 'http://tts:4010/ping';
  if (target === 'sound') url = 'http://sound:4011/ping';
  if (target === 'image') url = 'http://image:4012/ping';
  if (!url) return res.json({ error: 'Unknown stub target.' });
  import('http').then(http => {
    http.get(url, (r) => {
      let data = '';
      r.on('data', chunk => data += chunk);
      r.on('end', () => res.json({ response: data }));
    }).on('error', () => res.json({ error: 'Error pinging ' + target }));
  });
});

app.get('/test-stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const test = spawn('npm', ['test']);
  test.stdout.on('data', (data) => {
    res.write(`data: ${data.toString().replace(/\n/g, '\n')}\n\n`);
  });
  test.stderr.on('data', (data) => {
    res.write(`data: ERROR: ${data.toString().replace(/\n/g, '\n')}\n\n`);
  });
  test.on('close', (code) => {
    res.write(`data: Test process exited with code ${code}\n\n`);
    res.end();
  });
  req.on('close', () => test.kill());
});

app.listen(port, () => {
  console.log(`Node stream server running on port ${port}`);
});

