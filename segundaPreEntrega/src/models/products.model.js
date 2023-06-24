import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        default: 'accesorios',
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    }
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model('products', productSchema);
