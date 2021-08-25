import { AccountType } from "./AccountType";
import { User } from "./User";

export interface Account {
  uid: string;
  user: User | User["uid"];
  type: AccountType;
  name: string;
}

export interface CreditCardAccount extends Account {
  billStartDay: number;
  chargeDay: number;
  creditAmount: number;
}