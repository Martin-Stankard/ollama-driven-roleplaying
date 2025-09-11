import express from 'express';
const app = express();
app.get('/ping', (req, res) => res.send('pong from stub2'));
app.listen(4002, () => console.log('stub2 running on 4002'));
