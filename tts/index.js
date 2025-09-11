import express from 'express';
const app = express();
app.get('/ping', (req, res) => res.send('pong from tts'));
app.listen(4010, () => console.log('tts running on 4010'));
