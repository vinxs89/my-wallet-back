export interface Budget {
  email: string;
  password: string;
  avatar: string;
}

export interface CategoryBudget extends Budget {
  category: string;
}

export interface LocationBudget extends Location {
  location: string;
}