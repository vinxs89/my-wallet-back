import { User } from "../../models/User";
import { ProfileFields, UserFields, UserRepository } from "../UserRepository";
import { Profile } from "../../models/Profile";
import UserModel from "../../models/mongo/User";
import ProfileModel from "../../models/mongo/Profile";

export class MongoUserRepository implements UserRepository {

  async getUserById(id: string): Promise<User> {
    return UserModel.findById(id);
  }
  async findByEmail(email: string): Promise<User> {
    return UserModel.findOne({ email })
  }

  async createUser(userFields: UserFields): Promise<User> {  
    const user = new UserModel(userFields);
    return user.save();
  }

  async deleteUser(userId: string): Promise<void> {
    await ProfileModel.findOneAndRemove({ user: userId });
    await UserModel.findOneAndRemove({ _id: userId });
  }

  async getUserProfile(userId: string): Promise<Profile> {
    return await ProfileModel.findOne({
      user: userId,
    }).populate("user", ["avatar", "email"]);
  }

  async createProfile(profileFields: ProfileFields): Promise<Profile> {
    const profile = new ProfileModel(profileFields);
    return await profile.save();
  }

  async updateProfile(userId: string, profileFields: ProfileFields): Promise<Profile> {
    return await ProfileModel.findOneAndUpdate(
      { user: userId },
      { $set: profileFields },
      { new: true }
    );
  }
}