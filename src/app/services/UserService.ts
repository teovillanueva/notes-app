import { User, IUser } from "@models/User";

interface ICreateUserParams {
	email: string;
	password: string;
	social?: IUser["social"];
}

export class UserService {
	public static async createUser(data: ICreateUserParams) {
		const user = new User(data);

		return await user.save();
	}
}
