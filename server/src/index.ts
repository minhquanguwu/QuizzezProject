import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './api/routes';
dotenv.config();

const PORT = 5500 || process.env.PORT;
const app = express();

app.use(cors());
app.use(
	express.json({
		limit: '20mb',
	})
);
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use('/api', apiRoutes);
const server = async () => {
	app.listen(PORT, () => {
		console.log(`App is running on PORT: ${PORT}`);
	});
};

server();
