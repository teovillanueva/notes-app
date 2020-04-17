import { Request, NextFunction, Response } from "express";

export const AuthenticationMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.isAuthenticated()) {
		return next();
	}

	return res.redirect("/auth/login");
};
