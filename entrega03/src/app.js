import express from 'express';
import ProductManager from './productManager.js';

const app = express();
const productsManager = new ProductManager();

// Servidor

app.use(express.urlencoded({ extended: true }));
app.listen(8080, () => console.log('Server up on port 8080'));

// Rutas

app.get('/products', async (req, res) => {
	const products = await productsManager.getProducts();
	res.json(products);
});
