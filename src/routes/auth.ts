import { Router } from "express";

import { AuthController } from "@controllers/AuthController";
import { RegisterValidator } from "@validators/RegisterValidator";
import { GuestMiddleware } from "@middlewares/GuestMiddleware";

export const auth = Router();

auth.get("/login", GuestMiddleware, (req, res) => res.render("auth/login.ejs"));
auth.post("/login", AuthController.login);

auth.get("/register", GuestMiddleware, (req, res) => res.render("auth/register.ejs"));
auth.post("/register", RegisterValidator, AuthController.register);

auth.get("/logout", AuthController.logout);

auth.get("/github", AuthController.githubRedirect);
auth.get("/github/callback", AuthController.githubCalback);
