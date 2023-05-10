import express from 'express';
import { cartRouter } from './routers/cart.router.js';
import { productsRouter } from './routers/products.router.js';
import ProductManager from './productManager.js';

const productManager = new ProductManager();

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

app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);

 // Rutas

app.get('/api/products', async (req, res) => {
	res.send(await productManager.getProducts());

});

app.post('/api/products', async (req, res) => {
	const product = req.body;
	res.send(await productManager.addProduct(product));
});

// app.get('/api/products/:id', async (req, res) => {
// 	try {
// 		const id = req.params.id;
// 		const products = await productManager.getProductById(id);
// 		res.json(products);
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// app.post('/api/products', async (req, res) => {
// 	try {
// 		const product = req.body;
// 		res.json(product);
// 	} catch (err) {
// 		console.log(err);
// 	}
// });
