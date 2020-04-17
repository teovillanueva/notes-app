import { Router } from "express";

import { AuthenticationMiddleware } from "@middlewares/AuthenticationMiddleware";

import { NoteController } from "@controllers/NoteController";

import { StoreNoteValidator } from "@validators/StoreNoteValidator";

export const notes = Router();

notes.use(AuthenticationMiddleware);

notes.get("/", NoteController.index);

notes.post("/", StoreNoteValidator, NoteController.store);
notes.get("/create", (req, res) => res.render("notes/create"));

notes.get("/:id", NoteController.show);

notes.delete("/:id", NoteController.destroy);
