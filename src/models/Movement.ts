import { Account } from "./Account";

export interface Movement {
  uid: string;
  account: Account | Account["uid"];
  category: string;
  value: number;
  location: string;
  date: Date;
  dateAdded: Date;
  dateModified: Date;
}

export interface PlannedMovement extends Movement {
  receiveExpireNotification: boolean;
  receiveAddedNotification: boolean;
}