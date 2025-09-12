const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 8079;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/admin';

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

// MongoDB CRUD endpoints
app.post('/create', async (req, res) => {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  const db = client.db();
  const result = await db.collection('test').insertOne({ msg: 'Created at ' + new Date().toISOString() });
  await client.close();
  res.json(result);
});

app.get('/read', async (req, res) => {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  const db = client.db();
  const docs = await db.collection('test').find().toArray();
  await client.close();
  res.json(docs);
});

app.post('/write', async (req, res) => {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  const db = client.db();
  const result = await db.collection('test').updateOne(
    {},
    { $set: { msg: 'Updated at ' + new Date().toISOString() } },
    { upsert: true }
  );
  await client.close();
  res.json(result);
});

app.post('/delete', async (req, res) => {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  const db = client.db();
  const result = await db.collection('test').deleteOne({});
  await client.close();
  res.json(result);
});

app.listen(port, () => {
  console.log(`Node stream server running on port ${port}`);
});
