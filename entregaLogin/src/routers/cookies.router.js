import { Router } from 'express';

const cookieRouter = Router();

cookieRouter.get('/get', (req, res) => {
	res.send(req.signedCookies);
});

cookieRouter.get('/set', (req, res) => {
	res.cookie('name', 'gaby', { maxAge: 10000, signed: true });
	res.send('Cookie set');
});

cookieRouter.get('/delete', (req, res) => {
	res.clearCookie('name');
	res.send('Cookie deleted');
});

export default cookieRouter;
