import express from 'express';
const app = express();
app.get('/ping', (req, res) => res.send('pong from image'));
app.listen(4012, () => console.log('image running on 4012'));
