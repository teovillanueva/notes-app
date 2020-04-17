import { Request, Response, NextFunction } from "express";

import { validationResult } from "express-validator";

import { Passport } from "@config/passport";

import { UserService } from "@services/UserService";

interface IRegisterUserBody {
	email: string;
	password: string;
}

export class AuthController {
	public static login = Passport.authenticate("local", {
		successRedirect: "/notes",
		failureRedirect: "/auth/login",
		failureFlash: true,
	});

	public static async register(
		req: Request<any, any, IRegisterUserBody>,
		res: Response,
		next: NextFunction
	) {
		const validation = validationResult(req);

		if (!validation.isEmpty()) {
			return res.render("auth/register", {
				errors: validation.mapped(),
				email: req.body.email,
			});
		}

		const user = await UserService.createUser(req.body);

		req.login(user, (err) => {
			if (err) next(err);
			return res.redirect(`/notes`);
		});
	}

	public static logout(req: Request, res: Response) {
		req.logout();
		req.session?.destroy(() => {
			return res.redirect("/auth/login");
		});
	}

	public static githubRedirect = Passport.authenticate("github");
	public static githubCalback = Passport.authenticate("github", {
		failureRedirect: "/login",
		successRedirect: "/notes",
	});
}
