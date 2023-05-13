import express from 'express';
import { productsRouter } from './routes/products.router.js';
//  import { cartsRouter } from './routes/carts.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
//  app.use('/api/carts', cartsRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
