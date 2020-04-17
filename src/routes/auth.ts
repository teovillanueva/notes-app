import { Router } from "express";

import { AuthController } from "@controllers/AuthController";
import { RegisterValidator } from "@validators/RegisterValidator";

export const auth = Router();

auth.get("/login", (req, res) => res.render("auth/login.ejs"));
auth.post("/login", AuthController.login);

auth.get("/register", (req, res) => res.render("auth/register.ejs"));
auth.post("/register", RegisterValidator, AuthController.register);

auth.get("/logout", AuthController.logout);

auth.get("/github", AuthController.githubRedirect);
auth.get("/github/callback", AuthController.githubCalback);
