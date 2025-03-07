import AccountDAO from "../../external/AccountDAODatabase";
import GetAccountAccountDAO from "../daos/GetAccountAccountDAO";

export default class GetAccount {

	constructor (private accountDAO: GetAccountAccountDAO) {
	}

	async execute (accountId: string) {
		const account = await this.accountDAO.getById(accountId, true);
		return account;
	}
}
