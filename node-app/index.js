import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.emit('chat', { sender: 'system', text: 'Connected to Node App.' });

  // Per-socket clock interval
  let clockInterval = null;

  socket.on('dl-llama', async () => {
    socket.emit('chat', { sender: 'system', text: 'Requesting llama3.2:1b download...' });
    try {
      const res = await axios.post(process.env.OLLAMA_URL + '/api/pull', { name: 'llama3.2:1b' });
      if (res.data.status === 'success' || res.data.status === 'ok') {
        socket.emit('chat', { sender: 'ollama', text: 'llama3.2:1b download started or already available.' });
      } else {
        socket.emit('chat', { sender: 'ollama', text: 'llama3.2:1b download response: ' + JSON.stringify(res.data) });
      }
    } catch (err) {
      socket.emit('chat', { sender: 'ollama', text: 'Error requesting llama3.2:1b download.' });
    }
  });

  socket.on('check-ollama', async () => {
    try {
      const res = await axios.get(process.env.OLLAMA_URL + '/api/tags');
      const hasLlama = res.data.models.some(m => m.name === 'llama3.2:1b');
      socket.emit('chat', { sender: 'ollama', text: hasLlama ? 'llama3.2:1b is available.' : 'llama3.2:1b is NOT available.' });
    } catch (err) {
      socket.emit('chat', { sender: 'ollama', text: 'Error connecting to ollama.' });
    }
  });

  socket.on('go', () => {
    if (!clockInterval) {
      clockInterval = setInterval(() => {
        socket.emit('clock', { time: new Date().toLocaleTimeString() });
      }, 1000);
      socket.emit('chat', { sender: 'system', text: 'Clock started.' });
    }
  });

  socket.on('stop', () => {
    if (clockInterval) {
      clearInterval(clockInterval);
      clockInterval = null;
      socket.emit('chat', { sender: 'system', text: 'Clock stopped.' });
    }
  });

  socket.on('disconnect', () => {
    if (clockInterval) clearInterval(clockInterval);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
