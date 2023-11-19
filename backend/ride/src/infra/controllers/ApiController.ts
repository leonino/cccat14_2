import { Request, Response } from "express";
import GetAccount from '../../domain/usecases/GetAccount';
import Signup from '../../domain/usecases/Signup';
import AccountDAODatabase from '../../external/AccountDAODatabase';
import LoggerConsole from '../../external/LoggerConsole';

export default class ApiController {

  constructor() { }

  execute(app: any) {
    app.post("/signup", async function (req: Request, res: Response) {
      try {
        const input = req.body;
        const accountDAO = new AccountDAODatabase();
        const logger = new LoggerConsole();
        const signup = new Signup(accountDAO, logger);
        const output = await signup.execute(input);
        res.json(output);
      } catch (e: any) {
        res.status(422).json({
          message: e.message
        });
      }
    });

    app.get("/accounts/:accountId", async function (req: Request, res: Response) {
      const accountId = req.params.accountId;
      const accountDAO = new AccountDAODatabase();
      const getAccount = new GetAccount(accountDAO);
      const output = await getAccount.execute(accountId);
      res.json(output);
    });

    return app;
  }
}

