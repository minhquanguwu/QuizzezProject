import mongoose from 'mongoose';

const DBconnection = async () => {
	await mongoose.connect(process.env.MONGODB_URI, {
		dbName: 'quizzez',
	});
};
export default DBconnection;
