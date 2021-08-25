import { MovementModel } from "../../models/mongo/Movement";
import { Movement } from "../../models/Movement";
import { MovementFields, MovementRepository, MovementSearchFields } from "../MovementRepository";

export class MongoMovementRepository implements MovementRepository {

  async getMovementById(movementId: string): Promise<Movement> {
    return MovementModel.findById(movementId);
  }

  async findMovements(searchFields: MovementSearchFields): Promise<Movement[]> {
    throw new Error("Method not implemented.");
  }

  async createMovement(accountId: string, fields: MovementFields): Promise<Movement> {
    const movement = new MovementModel(fields);
    movement.account = accountId;
    return await movement.save();
  }

  async updateMovement(movementId: string, fields: MovementFields): Promise<Movement> {
    return await MovementModel.findOneAndUpdate(
      { _id: movementId },
      { $set: fields },
      { new: true }
    )
  }

  async deleteMovement(movementId: string): Promise<void> {
    await MovementModel.findByIdAndDelete(movementId);
  }
  
}