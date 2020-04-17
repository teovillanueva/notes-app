import { Strategy } from "passport-local";

import bcrypt from "bcrypt";

import { User } from "@models/User";

export const LocalStrategy = new Strategy(
	{
		usernameField: "email",
	},
	async (email, password, done) => {
		try {
			const user = await User.findOne({ email });

			if (!user) {
				return done(null, false, {
					message: "User not found or invalid password.",
				});
			}

			const passwordsMatch = bcrypt.compareSync(password, user.password);

			if (!passwordsMatch) {
				return done(null, false, {
					message: "User not found or invalid password.",
				});
			}

			return done(null, user);
		} catch (error) {}
	}
);
