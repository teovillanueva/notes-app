import { check } from "express-validator";

import { User } from "@models/User";

export const RegisterValidator = [
	check("email")
		.isEmail()
		.withMessage("Please enter a valid email")
		.normalizeEmail()
		.custom(async (email, { req }) => {
			return User.findOne({ email }).then(user => {
				if (user) {
					return Promise.reject("That email is already taken!");
				}
			});
		})
		.withMessage("That email is already taken!"),
	check("password", "Please enter your password").notEmpty(),
	check("password_confirmation")
		.custom((value, { req }) => value === req.body.password)
		.withMessage("Passwords dont match!")
];
