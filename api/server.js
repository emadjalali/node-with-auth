import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import authRoutes from './v1/routes/authRoutes.js';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
const port = process.env.PORT || 4200;

app.get('/', (req, res) => {
  res.send('Welcome to node-with-authentication');
});

app.use('/api/v1/auth', authRoutes);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
