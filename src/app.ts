import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { notificationRoutes } from './routes/notificationRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/notifications', notificationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
