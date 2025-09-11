import express from 'express';
const app = express();
app.get('/ping', (req, res) => res.send('pong from stub1'));
app.listen(4001, () => console.log('stub1 running on 4001'));
