import crypto from "crypto";
import Logger from "../../infra/Logger";
import RideDAO from "../daos/RideDAO";

export default class GetRide {

	constructor (private rideDAO: RideDAO, private logger: Logger) {
	}

	async execute (rideId: string) {
		this.logger.log(`getRide`);
		const ride = await this.rideDAO.getById(rideId);
		return ride;
	}

}
