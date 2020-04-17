import { Request, Response } from "express";

import { Types } from "mongoose";

import { validationResult } from "express-validator";

import { Note } from "@models/Note";

interface IStoreNoteBody {
	title: string;
	text: string;
}

export class NoteController {
	public static async index(req: Request, res: Response) {
		const notes = await Note.find({ user: req.user?._id });

		return res.render("notes/index", { notes });
	}
	public static async store(
		req: Request<any, any, IStoreNoteBody>,
		res: Response
	) {
		const validation = validationResult(req);

		if (!validation.isEmpty()) {
			return res.render("notes/create", {
				errors: validation.mapped(),
			});
		}

		const data = req.body;

		const note = new Note({
			title: data.title,
			text: data.text,
			user: req.user?._id
		});

		await note.save();

		return res.redirect(`/notes/${note._id}`);
	}

	public static async show(req: Request<{ id: string }>, res: Response) {
		try {
			const note = await Note.findById(Types.ObjectId(req.params.id));

			if (!note || `${note.user}` !== `${req.user?._id}`) {
				return res.redirect("/notes");
			}

			return res.render("notes/show", { note });
		} catch (error) {
			return res.redirect("/notes");
		}
	}

	public static async destroy(req: Request<{ id: string }>, res: Response) {
		const deleted = await Note.deleteOne({ _id: req.params.id });

		if (deleted.ok) {
			return res.redirect("/notes");
		}
	}
}
