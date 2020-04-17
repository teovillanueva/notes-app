import path from "path";
import { Server as HTTPServer } from "http";

import Express from "express";
import Session from "express-session";
import EjsLayouts from "express-ejs-layouts";

import flash from "connect-flash";

import MethodOverride from "method-override";

import { Passport } from "@config/passport";

import { router } from "@routes/index";

export class Server {
	private readonly PORT = process.env.PORT;

	private _app: Express.Application;

	private _httpServer!: HTTPServer;

	constructor() {
		this._app = Express();

		this._configureApp();
		this._applyMiddlewares();
		this._setupAuthentication();
		this._registerRouter();
	}

	private _configureApp() {
		this._app.set("views", path.join(__dirname, "views"));
		this._app.set("view engine", "ejs");
		this._app.set("layout", "layouts/app.layout.ejs");
	}

	private _applyMiddlewares() {
		this._app.use(MethodOverride("_method"));
		this._app.use(Express.urlencoded({ extended: false }));
		this._app.use(EjsLayouts);
		this._app.use(
			Session({
				secret: "secret",
				resave: true,
				saveUninitialized: true,
			})
		);
		this._app.use(flash());
	}

	private _setupAuthentication() {
		this._app.use(Passport.initialize());
		this._app.use(Passport.session());
		this._app.use((req, res, next) => {
			res.locals.error = req.flash("error");
			res.locals.success = req.flash("success");
			res.locals.isAuthenticated = req.isAuthenticated();
			res.locals.user = req.user;
			next();
		});
	}

	private _registerRouter() {
		this._app.use(router);
	}

	public start() {
		this._httpServer = this._app.listen(this.PORT, () => {
			console.log(`Listening on port ${this.PORT}`);
		});

		return this;
	}

	public get app() {
		return this._app;
	}
}
