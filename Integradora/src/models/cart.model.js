import mongoose from 'mongoose';
import { productSchema } from '../models/product.model.js';

const cartSchema = new mongoose.Schema({
	products: {
		type: [productSchema],
		require: false,
		default: [],
	},
});

export const cartModel = mongoose.model('carts', cartSchema);
