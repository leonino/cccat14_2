import crypto from "crypto";
import Logger from "../../infra/Logger";
import RideDAO from "../daos/RideDAO";

export default class RequestRide {

	constructor (private rideDAO: RideDAO, private logger: Logger) {
	}

	async execute (input: any) {
		this.logger.log(`requestRide`);
		input.rideId = crypto.randomUUID();
		input.status = "requested";
		input.date = new Date();
		await this.rideDAO.save(input);
		return {
			rideId: input.rideId
		};
	}

}
