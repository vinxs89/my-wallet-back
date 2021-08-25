import { Movement } from "../models/Movement";

export interface MovementFields {

}

export interface MovementSearchFields {

}

export interface MovementRepository {

  getMovementById(movementId: string): Promise<Movement>;

  findMovements(searchFields: MovementSearchFields): Promise<Movement[]>;

  createMovement(accountId: string, fields: MovementFields): Promise<Movement>

  updateMovement(movementId: string, fields: MovementFields): Promise<Movement>

  deleteMovement(movementId: string): Promise<void>;

}