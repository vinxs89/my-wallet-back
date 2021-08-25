import { Document, Model, model, Schema } from "mongoose";

import { User } from "../User";

/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param avatar:string
 */
interface IUser extends Document, User {}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.virtual('uid').get(function() {
  return this._id;
});

const UserModel: Model<IUser> = model("User", userSchema);

export default UserModel;
