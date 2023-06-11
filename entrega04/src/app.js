import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import ProductController from './controllers/productsController.js';
import viewsRouter from './routes/views.router.js';
import productRouter from './routes/products.router.js';


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

const webServer = app.listen(8080, () => {
	console.log('Server is running on port 8080');
});

const io = new Server(webServer);

io.on('connection', async (socket) => {
	try {
		socket.emit('realTimeProducts', await productController.getProducts());
	} catch (err) {
		console.log(err);
	}

	socket.on('carga', async (product) => {
		try {
			const newProduct = await productController.addProduct(product);
			const updatedProducts = await productController.getProducts();
			io.emit('realTimeProducts', updatedProducts);
		} catch (err) {
			console.log(err);
		}
	});
});
