import { Profile } from "../models/Profile";
import { User } from "../models/User";

export interface UserFields {
  email: any; 
  password: string; 
  avatar: string;
}

export interface ProfileFields {
  user: string; 
  firstName: any; 
  lastName: any; 
  username: any;
}

export interface UserRepository {
  
  deleteUser(userId: string): Promise<void>;

  createProfile(profileFields: ProfileFields): Promise<Profile>;
  
  updateProfile(userId: string, profileFields: ProfileFields): Promise<Profile>;
  
  getUserProfile(userId: string): Promise<Profile>;

  createUser(userFields: UserFields): Promise<User>;

  findByEmail(email: string): Promise<User>;

  getUserById(id: string): Promise<User>

}