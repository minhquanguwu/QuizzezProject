import mongoose from 'mongoose';

const DBconnection = async () => {
	await mongoose.connect(process.env.MONGO_URI, {
		dbName: 'quizzez-project',
		appName: 'Quizzez Project',
	});
};
export default DBconnection;
