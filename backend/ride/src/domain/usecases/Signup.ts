import crypto from "crypto";
import AccountDAO from "../daos/AccountDAO";
import Logger from "../../infra/Logger";
import SignupAccountDAO from "../daos/SignupAccountDAO";
import Cpf from '../valueObjects/Cpf';

export default class Signup {

	constructor (private accountDAO: SignupAccountDAO, private logger: Logger) {
	}

	async execute (input: any) {
		this.logger.log(`signup ${input.name}`);
		input.accountId = crypto.randomUUID();
		const account = await this.accountDAO.getByEmail(input.email);
		if (account) throw new Error("Duplicated account");
		if (this.isInvalidName(input.name)) throw new Error("Invalid name");
		if (this.isInvalidEmail(input.email)) throw new Error("Invalid email");
		if (!(new Cpf(input.cpf)).validate()) throw new Error("Invalid cpf");
		if (input.isDriver && this.isInvalidCarPlate(input.carPlate)) throw new Error("Invalid car plate");
		await this.accountDAO.save(input);
		return {
			accountId: input.accountId
		};
	}

	isInvalidName (name: string) {
		return !name.match(/[a-zA-Z] [a-zA-Z]+/);
	}

	isInvalidEmail (email: string) {
		return !email.match(/^(.+)@(.+)$/);
	}

	isInvalidCarPlate (carPlate: string) {
		return !carPlate.match(/[A-Z]{3}[0-9]{4}/);
	}
}
