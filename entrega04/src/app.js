import express from 'express';
import handlebars from 'express-handlebars';

import ProductController from './controllers/productsController.js';
import { viewsRouter } from './routes/views.router.js';
import productRouter from './routes/products.router.js';
import { Server } from 'socket.io';

const productController = new ProductController();

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/', viewsRouter);
app.use('/products', viewsRouter);

const webServer = app.listen(8080, () => {
	console.log('Server is running on port 8080');
});

const io = new Server(webServer);

// io.on('connection', async (socket) => {
// 	console.log('New connection');
// 	try {
// 		socket.emit('products', await productController.getProducts());
// 	} catch (err) {
// 		console.log(err);
// 	}

// 	socket.on('new-product', async (data) => {
// 		try {
// 			await productController.addProduct(data);
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	});

// 	socket.on('delete-product', async (id) => {
// 		try {
// 			await productController.deleteProduct(id);
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	});

// 	socket.on('update-product', async (data) => {
// 		try {
// 			await productController.updateProduct(data);
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	});
// });
io.on('connection', (socket) => {
	console.log('New connection');
	socket.emit('products', 'hola')
});

	
