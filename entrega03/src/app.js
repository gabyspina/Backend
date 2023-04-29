import express from 'express';
import ProductManager from './productManager.js';

const app = express();

const productManager = new ProductManager();

// Servidor

app.use(express.urlencoded({ extended: true }));
app.listen(8080, () => {
	console.log('Server up on port 8080');
});

// Rutas

app.get('/products', async (req, res) => {
	try {
		const products = await productManager.getProducts();
		res.json(products);
	} catch (err) {
		console.log(err);
	}
});

app.get('/products/:limit', async (req, res) => {
	try {
		const products = await productManager.getProducts();
		const limit = req.params.limit;
		res.json(products.slice(0, limit));
	} catch (err) {
		console.log(err);
	}
});

app.get('/products/id/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const product = await productManager.getProductById(id);
		res.json(product);
	} catch (err) {
		console.log(err);
	}
});
