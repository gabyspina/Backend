import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	first_name: { type: String, required: true, max: 100 },
	last_name: { type: String, required: true, max: 100 },
	email: { type: String, required: true, max: 100, unique: true, index: true },
	password: { type: String, required: true, max: 100 },
	img: { type: String, max: 100 },
	age: { type: Number, max: 100 },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
