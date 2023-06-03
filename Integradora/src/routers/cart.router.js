import { Router } from 'express';
import { cartService } from '../services/cart.services.js';

const cartRouter = Router();

cartRouter.get('/', async (req, res) => {
	try {
		const cart = await cartService.getAllCarts();
		res.send(cart);
	} catch (error) {
		res.status(500).send(error);
	}
});

cartRouter.post('/', async (req, res) => {
	const cart = req.body;
	try {
		const newCart = await cartService.addToCart(cart);
		res.send(newCart);
	} catch (error) {
		res.status(500).send(error);
	}
});

export default cartRouter;
