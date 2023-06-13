import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import cartRouter from './routers/cart.router.js';
import productRouter from './routers/product.router.js';
import chatRouter from './routers/chat.router.js';
import viewsRouter from './routers/views.router.js';
import { productService } from './services/product.services.js';
import { chatService } from './services/chat.services.js';

const app = express();
const messages = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de handlebars

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', 'views/');

// Configuración de archivos estáticos
app.use(express.static('public'));

// Configuración de rutas
app.use('/api/products', productRouter);
app.use('/', viewsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chat', chatRouter);

// Configuración de mongoose
mongoose.connect(
	'mongodb+srv://gabyspina:gsp246813579@coderclaster.gnpohje.mongodb.net/ecommerce?retryWrites=true&w=majority'
);

const webServer = app.listen(8080, () => {
	console.log('Server started on port 8080');
});

const io = new Server(webServer);

io.on('connection', async (socket) => {
	try {
		socket.emit('realTimeProducts', await productService.getAllProducts());
	} catch (error) {
		console.log(error);
	}

	socket.on('carga', async (product) => {
		try {
			const newProduct = await productService.addProduct(product);
			const updatedProducts = await productService.getAllProducts();

			io.emit('realTimeProducts', updatedProducts);
		} catch (error) {
			console.log(error);
		}
	});
	try {
		socket.emit('messages', messages);
	} catch (error) {
		console.log(error);
	}

	socket.on('message', async (message) => {
		try {
			const chatData = {
				email: message.email,
				message: message.msj,
			};
			messages.push(message);
			io.emit('messages', messages);
			await chatService.saveChat(chatData);
		} catch (error) {
			console.log(error);
		}
	});
	socket.on('sayHello', (data) => {
		socket.broadcast.emit('connected', data);
	});
});
