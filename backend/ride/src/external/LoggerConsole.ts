import Logger from "../infra/Logger";

export default class LoggerConsole implements Logger {
	log (message: string) {
		console.log(message);
	}
}
