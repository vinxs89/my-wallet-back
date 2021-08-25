import { AccountType } from "../models/AccountType";
import { Account } from "../models/Account";

export interface AccountFields {
  name: string,
  type: AccountType,
  billStartDay?: number;
  chargeDay?: number;
  creditAmount?: number;
}

export interface AccountRepository {

  deleteAllAccountsForUser(userId: string): Promise<void>
  
  getAllAccounts(): Promise<Account[]>;

  getAllAccountsForUser(userId: string): Promise<Account[]>;

  createAccount(userId: string, fields: AccountFields): Promise<Account>;

  updateAccount(accountId: string, fields: AccountFields): Promise<Account>;

  deleteAccount(accountId: string): Promise<void>;

}