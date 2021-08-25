import { Router, Response } from "express";
import { body, validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";

import Request from "../../types/Request";
import { AccountRepository } from "../../../config/Repositories";
import auth from "../../middleware/auth";

const router: Router = Router();

router.post(
  "/",
  [
    auth,
    body("type", "Parameter type is empty").notEmpty(),
    body("name", "Paramater name is empty").notEmpty(),
    body("billStartDay", "Parameter billStartDay is empty").if(body("type").equals("CREDIT_CARD")).notEmpty(),
    body("chargeDay", "Parameter chargeDay is empty").if(body("type").equals("CREDIT_CARD")).notEmpty(),
    body("creditAmount", "Parameter creditAmount is empty").if(body("type").equals("CREDIT_CARD")).notEmpty()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { type, name, billStartDay, chargeDay, creditAmount } = req.body;
    try {
      const account = await AccountRepository.createAccount(
        req.userId,
        {
          type,
          name,
          billStartDay,
          chargeDay,
          creditAmount
        }
      );
      res.json(account);
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

export default router;