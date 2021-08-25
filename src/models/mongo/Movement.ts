import { Document, Model, model, Schema } from "mongoose";
import { Movement, PlannedMovement } from "../Movement";

/**
 * Interface to model the Movement Schema for TypeScript.
 * @param account:ref => Account._id
 */
interface IMovement extends Document, Movement {}

/**
 * Interface to model the PlannedMovement Schema for TypeScript.
 * @param account:ref => Account._id
 */
interface IPlannedMovement extends Document, PlannedMovement {}

const movementSchema: Schema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account"
  },
  value: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const plannedMovementSchema: Schema = new Schema({
  receiveExpireNotification: {
    type: Boolean,
    required: true
  },
  receiveAddedNotification: {
    type: Boolean,
    required: true
  }
});

movementSchema.virtual('uid').get(function() {
  return this._id;
});

plannedMovementSchema.virtual('uid').get(function() {
  return this._id;
});

const MovementModel: Model<IMovement> = model("Movement", movementSchema);
const PlannedMovementModel: Model<IPlannedMovement> = MovementModel.discriminator("PlannedMovement", plannedMovementSchema);

export {
  MovementModel,
  PlannedMovementModel
}
