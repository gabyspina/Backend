import { Router } from 'express';
import { chatService } from '../services/chat.services.js';

// Instanciamos el router
const chatRouter = Router();

// Definimos la ruta para el home
chatRouter.get('/', async (req, res) => {
	res.render('chat');
});

chatRouter.get('/savedChats/', async (req, res) => {
	res.send(chatService.getChat());
});

// Exportamos el router
export default chatRouter;
