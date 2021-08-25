import { Document, Model, model, Schema } from "mongoose";
import { Budget, CategoryBudget, LocationBudget } from "../Budget";

/**
 * Interface to model the Budget Schema for TypeScript.
 * @param user:ref => User._id
 */
interface IBudget extends Document, Budget {}

/**
 * Interface to model the CategoryBudget Schema for TypeScript.
 * @param user:ref => User._id
 */
interface ICategoryBudget extends CategoryBudget {}

/**
 * Interface to model the LocationBudget Schema for TypeScript.
 * @param user:ref => User._id
 */
interface ILocationBudget extends LocationBudget {}

const budgetSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const categoryBudgetSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const locationBudgetSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const BudgetModel: Model<IBudget> = model("Budget", budgetSchema);
const CategoryBudgetModel: Model<ICategoryBudget> = BudgetModel.discriminator("CategoryBudget", categoryBudgetSchema);
const LocationBudgetModel: Model<ILocationBudget> = BudgetModel.discriminator("LocationBudget", locationBudgetSchema);

export {
  BudgetModel,
  CategoryBudgetModel,
  LocationBudgetModel
}
