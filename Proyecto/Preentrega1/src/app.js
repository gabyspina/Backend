import express from 'express';
import { cartRouter } from './routers/cart.router.js';
import { productsRouter } from './routers/products.router.js';
import ProductManager from './productManager.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Server

const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

//Routes

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
