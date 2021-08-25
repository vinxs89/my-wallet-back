import { User } from "./User";

export interface Profile {
  user: User | User["uid"];
  firstName: string;
  lastName: string;
}