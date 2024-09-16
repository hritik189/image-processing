import express from 'express';
import cors from 'cors';
import imageRoutes from './routes/imageRoutes';
import morgan from 'morgan';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/images', imageRoutes);

export default app;
