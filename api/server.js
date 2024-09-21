import express from 'express';
import bodyParser from 'body-parser';

import { connectToMongoDB } from './v1/config/mongoConfig.js';
import authRoutes from './v1/routes/authRoutes.js';

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 4200;

(async () => {
  await connectToMongoDB();

  app.get('/', (req, res) => {
    res.send('Welcome to node-with-authentication');
  });

  app.use('/api/v1/auth', authRoutes);

  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
  });
})();
