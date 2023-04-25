import express from 'express';
import { productManager } from './productManager';

// Servidor

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(8080, () => console.log('Server up on port 8080'));
