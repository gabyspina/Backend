import { Router } from 'express';
import ProductController from '../controllers/productsController.js';

const productRouter = Router();
const productController = new ProductController();

productRouter.post('/', async (req, res) => {
	const product = req.body;
	const result = await productController.addProduct(product);
	res.json(result);
});

productRouter.get('/', async (req, res) => {
	const products = await productController.getProducts();
	res.render('products', { products });
});

export default productRouter;
