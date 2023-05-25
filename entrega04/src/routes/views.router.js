import { Router } from 'express';
import ProductController from '../controllers/productsController.js';

const viewsRouter = Router();
const productController = new ProductController();

viewsRouter.get('/', async (req, res) => {
	try {
		const products = await productController.getProducts();
		const formData = req.body;
		res.render('index', { products, formData });
	} catch (err) {
		console.log(err);
	}
});

viewsRouter.get('/products', async (req, res) => {
	try {
		res.render('products');
	} catch (err) {
		console.log(err);
	}
});
export { viewsRouter };
