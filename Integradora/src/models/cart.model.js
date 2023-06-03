import mongoose from 'mongoose';
import productModel from './product.model.js';

const cartSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	products: [productModel],
});

export const cartModel = mongoose.model('carts', cartSchema);
