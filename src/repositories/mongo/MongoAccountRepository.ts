import { AccountModel, CreditCardAccountModel } from "../../models/mongo/Account";
import { Account } from "../../models/Account";
import { AccountFields, AccountRepository } from "../AccountRepository";
import { MovementModel } from "../../models/mongo/Movement";
import { AccountType } from "../../models/AccountType";

export class MongoAccountRepository implements AccountRepository {
  
  async deleteAllAccountsForUser(userId: string): Promise<void> {
    const accounts = await this.getAllAccountsForUser(userId);
    const operations = accounts.map(account => 
      Promise.all([MovementModel.deleteMany({account: account.uid}), AccountModel.findByIdAndDelete(account.uid)]));
    await Promise.all(operations);
  }
  
  async getAllAccounts(): Promise<Account[]> {
    return await AccountModel.find();
  }

  async getAllAccountsForUser(userId: string): Promise<Account[]> {
    return await AccountModel.find({user: userId});
  }

  async createAccount(userId: string, fields: AccountFields): Promise<Account> {
    let account;
    if (fields.type === (AccountType[AccountType.CREDIT_CARD] as unknown as AccountType)) {
      account = new CreditCardAccountModel(fields);
    } else {
      account = new AccountModel(fields);
    }
    account.user = userId;
    return await account.save();
  }

  async updateAccount(accountId: string, fields: AccountFields): Promise<Account> {
    return await AccountModel.findOneAndUpdate(
      { _id: accountId },
      { $set: fields },
      { new: true }
    )
  }

  async deleteAccount(accountId: string): Promise<void> {
    await AccountModel.findByIdAndDelete(accountId);
  }
  
}