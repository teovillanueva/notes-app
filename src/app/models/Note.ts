import { Schema, model, Document } from "mongoose";

export const NoteSchema = new Schema({
	title: {
		type: String,
		default: "Untitled"
	},
	text: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true
	}
});

export interface INote extends Document {
	titile: string;
	text: string;
	user: String;
}

export const Note = model<INote>("Note", NoteSchema);
