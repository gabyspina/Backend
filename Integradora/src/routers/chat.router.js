import { Router } from 'express';
import { chatService } from '../services/chat.services.js';

// Instanciamos el router
const chatRouter = Router();

// Definimos la ruta para el home
chatRouter.get('/', async (req, res) => {
	try {
		const chat = await chatService.getAllMessages();
		res.send(chat);
	} catch (error) {
		res.status(500).send(error);
	}
});

chatRouter.post('/', async (req, res) => {
	const message = req.body;
	try {
		const newMessage = await chatService.addMessage(message);
		res.send(newMessage);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Exportamos el router
export default chatRouter;
