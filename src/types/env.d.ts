declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		MONGODB_URI: string;

		GITHUB_CLIENT_ID: string;
		GITHUB_CLIENT_SECRET: string;
		GITHUB_REDIRECT_URI: string;
	}
}
