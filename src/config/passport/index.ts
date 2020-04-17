import Passport from "passport";

import { User, IUser } from "@models/User";

import { LocalStrategy } from "@passport/strategies/LocalStrategy";
import { GithubStrategy } from "@passport/strategies/GithubStrategy";

Passport.use(LocalStrategy);
Passport.use(GithubStrategy);

Passport.serializeUser((user: IUser, done) => {
	done(null, user._id);
});

Passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});

export { Passport };
