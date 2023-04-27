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
