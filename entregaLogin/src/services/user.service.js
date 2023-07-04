import userModel from '../models/user.model.js';

class UserService {
	constructor() {
		this.userModel = userModel;
	}

	async crateUser(userData) {
		const user = new this.userModel(userData);
		await user.save();
		return user;
	}

	async getAllUsers() {
		return await this.userModel.find();
	}

	async getByEmail(email) {
		return await this.userModel.findOne({ email });
	}
}

export const userService = new UserService();
