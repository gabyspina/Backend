import { Router } from 'express';
import { userService } from '../services/user.service.js';
const userRouter = Router();

userRouter.post('/', async (req, res) => {
	const userData = req.body;
	try {
		const newUser = await userService.crateUser(userData);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

userRouter.post('/auth', async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	try {
		const user = await userService.getByEmail(email);
		console.log(user);
		if (!user) throw new Error('Invalid data');
		if (user.password !== password) throw new Error('Invalid data');
		req.sessionID.user = user;
		res.status(201).json(user);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

export default userRouter;
