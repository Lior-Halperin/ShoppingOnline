import mongoose from "mongoose";
import { UserModel } from "./user-model";


// 1. Model interface describing the data:
export interface IShoppingCartModel extends mongoose.Document {
    productionDate: Date;
    userId: mongoose.Schema.Types.ObjectId; // Foreign Key
}

// 2. Model schema describing mor about model 
export const ShoppingCartSchema = new mongoose.Schema<IShoppingCartModel>({
    productionDate: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    }
}, {
    versionKey: false, //Don't add __v field
    toJSON: { virtuals: true }, // Allow to convert virtual fields to JSON 
    id: false // don't add additional id field
});

// ShoppingCartSchema.virtual("users", {
//     ref: UserModel, // Which model to specify
//     localField: "userId", // Foreign key of relation (in shoppingCart model)
//     foreignField: "_id", // Primary key of the relation (user model)
//     justOne: true // Each product has one category and not many
// });

// 3. Model class which mongoose create for us:
export const ShoppingCartModel = mongoose.model<IShoppingCartModel>("ShoppingCart", ShoppingCartSchema, "shoppingCart") // (Name for the model, The schema to build the model from, Which collection should be addressed in the data base)
