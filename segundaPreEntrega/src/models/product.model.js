import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		index: true,
	},
	description: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	status: {
		type: Boolean,
		required: true,
	},
	category: {
		type: String,
		required: true,
		index: true,
	},
	thumbnail: {
		type: String,
		required: true,
	},
});

export const productModel = mongoose.model('products', productSchema);