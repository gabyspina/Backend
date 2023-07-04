import { Router } from 'express';

const sessionRouter = Router();

sessionRouter.get('/login', (req, res) => {
	const { email, password } = req.query;
	if (email && password) {
		req.session.email = email;
		req.session.password = password;
		res.redirect('/');
	} else {
		res.send('Login failed');
	}
});

sessionRouter.get('/register', (req, res) => {
	res.send(' esto es un register');
});

sessionRouter.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/register');
		}
	});
});

export default sessionRouter;
