import DotEnv from "dotenv";

DotEnv.config();

import mongoose from "mongoose";
import { Server } from "@core/Server";

export const bootstrap = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log("Connected successfully to MongoDB");
	} catch (error) {
		console.log(error);
	}
	const server = new Server().start();
	return server;
};
