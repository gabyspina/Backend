import { Router } from 'express';
import ProductController from '../controllers/productsController.js';

const viewsRouter = Router();
const productController = new ProductController();

viewsRouter.get('/', async (req, res) => {
	try {
		const products = await productController.getProducts();

		res.render('products', { products });
	} catch (err) {
		console.log(err);
	}
});
export default viewsRouter;