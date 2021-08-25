import { Document, Model, model, Schema } from "mongoose";
import { Profile } from "../Profile";

/**
 * Interface to model the Profile Schema for TypeScript.
 * @param user:ref => User._id
 * @param firstName:string
 * @param lastName:string
 * @param username:string
 */
interface IProfile extends Document, Profile {}

const profileSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

profileSchema.virtual('uid').get(function() {
  return this._id;
});

const ProfileModel: Model<IProfile> = model("Profile", profileSchema);

export default ProfileModel;
