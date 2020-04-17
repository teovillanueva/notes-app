import { Router } from "express";

import { auth } from "@routes/auth";
import { notes } from "@routes/notes";

export const router = Router();

router.use("/auth", auth);
router.use("/notes", notes);

router.get("*", (req, res) => res.redirect("/auth/login"));