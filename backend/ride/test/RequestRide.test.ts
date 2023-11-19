import AccountDAO from "../src/domain/daos/AccountDAO";
import AccountDAODatabase from "../src/external/AccountDAODatabase";
import GetAccount from "../src/domain/usecases/GetAccount";
import GetRide from "../src/domain/usecases/GetRide";
import Logger from "../src/infra/Logger";
import LoggerConsole from "../src/external/LoggerConsole";
import RequestRide from "../src/domain/usecases/RequestRide";
import RideDAODatabase from "../src/external/RideDAODatabase";
import Signup from "../src/domain/usecases/Signup";
import sinon from "sinon";


let signup: Signup;
let getAccount: GetAccount;
let requestRide: RequestRide;
let getRide: GetRide;

beforeEach(() => {
	const accountDAO = new AccountDAODatabase();
	const rideDAO = new RideDAODatabase();
	const logger = new LoggerConsole();
	signup = new Signup(accountDAO, logger);
	getAccount = new GetAccount(accountDAO);
	requestRide = new RequestRide(rideDAO, logger);
	getRide = new GetRide(rideDAO, logger);
})

test("Deve solicitar uma corrida", async function () {
	const inputSignup = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "97456321558",
		isPassenger: true,
		password: "123456"
	};
	const outputSignup = await signup.execute(inputSignup);
	const inputRequestRide = {
		passengerId: outputSignup.accountId,
		fromLat: -27.584905257808835,
		fromLong: -48.545022195325124,
		toLat: -27.496887588317275,
		toLong: -48.522234807851476
	};
	const outputRequestRide = await requestRide.execute(inputRequestRide);
	expect(outputRequestRide.rideId).toBeDefined();
	const outputGetRide = await getRide.execute(outputRequestRide.rideId);
	console.log(outputGetRide);
});
