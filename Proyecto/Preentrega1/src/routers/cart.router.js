import { Router } from 'express';

const cart = [];
const cartRouter = Router();

cartRouter.get('/', (req, res) => {
	res.send(cart);
});

cartRouter.post('/', (req, res) => {
	const product = req.body;
	cart.push(product);
	res.status(201).send(product);
});

export { cartRouter };
