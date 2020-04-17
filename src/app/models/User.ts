import { Schema, model, Document } from "mongoose";

import bcrypt from "bcrypt";

export const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
	},
	social: {
		githubId: {
			type: String,
			required: false,
		},
	},
});

export interface IUser extends Document {
	email: string;
	password: string;
	social: {
		githubId: string;
	};
}

UserSchema.pre("save", function (next) {
	const user = this as IUser;

	if (!user.isModified("password")) return next();

	if (user.password) {
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
	}

	next();
});

export const User = model<IUser>("User", UserSchema);
