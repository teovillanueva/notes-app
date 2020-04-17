import { Request, NextFunction, Response } from "express";

export const GuestMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.isAuthenticated()) {
        return next();
    }

    return res.redirect("/notes");
};
