import { check } from "express-validator";

export const StoreNoteValidator = [
	check("title").notEmpty().withMessage("Please enter a title"),
	check("text").notEmpty().withMessage("Please enter your note text."),
];
