import mongoose from "mongoose";

export const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ]
});

cartSchema.pre('find', function() {
	this.populate('products.product')
});

export const cartModel = mongoose.model('carts', cartSchema);