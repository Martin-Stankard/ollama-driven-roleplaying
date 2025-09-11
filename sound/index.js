import express from 'express';
const app = express();
app.get('/ping', (req, res) => res.send('pong from sound'));
app.listen(4011, () => console.log('sound running on 4011'));
