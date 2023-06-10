import { Router } from 'express';

// Instanciamos el router
const chatRouter = Router();

// Definimos la ruta para el home
viewsRouter.get('/', (req, res) => {
	// Renderizamos la vista index
	res.render('chat');
});

// Exportamos el router
export default chatRouter;
