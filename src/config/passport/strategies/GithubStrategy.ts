import { Strategy } from "passport-github";
import { User } from "@models/User";
import { UserService } from "@services/UserService";

export const GithubStrategy = new Strategy(
	{
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: process.env.GITHUB_REDIRECT_URI,
	},
	async (accessToken, refreshToken, profile, cb) => {
		const user = await User.findOne({ social: { githubId: profile.id } });

		if (user) {
			return cb(null, user);
		}

		const newUser = await UserService.createUser({
			email: profile.username as string,
			password: (null as unknown) as string,
			social: {
				githubId: profile.id,
			},
		});

		cb(null, newUser);
	}
);
