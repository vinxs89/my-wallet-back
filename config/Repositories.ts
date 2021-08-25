import { AccountRepository } from "../src/repositories/AccountRepository";
import { MovementRepository } from "../src/repositories/MovementRepository";
import { UserRepository } from "../src/repositories/UserRepository"
import { MongoAccountRepository } from "../src/repositories/mongo/MongoAccountRepository";
import { MongoMovementRepository } from "../src/repositories/mongo/MongoMovementRepository";
import { MongoUserRepository } from "../src/repositories/mongo/MongoUserRepository";

const UserRepository: UserRepository = new MongoUserRepository();
const AccountRepository: AccountRepository = new MongoAccountRepository();
const MovementRepository: MovementRepository = new MongoMovementRepository();

export {
  UserRepository,
  AccountRepository,
  MovementRepository
}