import { Document, Model, model, Schema } from "mongoose";
import { Account, CreditCardAccount } from "../Account";
import { AccountType } from "../AccountType";

/**
 * Interface to model the Account Schema for TypeScript.
 * @param user:ref => User.id
 */
interface IAccount extends Document, Account {}

/**
 * Interface to model the CreditCardAccount Schema for TypeScript.
 * @param user:ref => User.id
 */
interface ICreditCardAccount extends Document, CreditCardAccount {}

const opts = { toJSON: { virtuals: true } };

const accountSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  type: {
    type: String,
    default: AccountType.BANK_ACCOUNT,
    enum: Object.values(AccountType)
  },
  name: {
    type: String,
    required: true
  }
}, opts);

const creditCardAccountSchema: Schema = new Schema({
  billStartDay: { 
    type: Number,
    required: true
  },
  chargeDay: { 
    type: Number,
    required: true
  },
  creditAmount: { 
    type: Number,
    required: true
  }
});

accountSchema.virtual('uid').get(function() {
  return this._id;
});

const AccountModel: Model<IAccount> = model("Account", accountSchema);
const CreditCardAccountModel: Model<ICreditCardAccount> = AccountModel.discriminator("CreditCardAccount", creditCardAccountSchema);

export {
  AccountModel,
  CreditCardAccountModel
}
