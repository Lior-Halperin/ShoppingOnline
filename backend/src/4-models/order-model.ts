import mongoose from "mongoose";
import { UserModel } from "./user-model";


// 1. Model interface describing the data:
export interface IOrderModel extends mongoose.Document {
    productionDate: Date;
    userId: mongoose.Schema.Types.ObjectId; // Foreign Key
    cityId: mongoose.Schema.Types.ObjectId;
    street: string;
    // creditCard:number;
}

// 2. Model schema describing mor about model 
export const OrderSchema = new mongoose.Schema<IOrderModel>({
    productionDate: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true,'Missing user id'],
        
    },
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true,"Missing city"],
    },
    street: {
        type: String,
        required: [true,"Missing street"],
        minlength: [2, "The street is too short"],
        maxlength: [20, "the street is to long"]
    },
    // creditCard :{
    //     type: Number,
    //     required: [true,'Missing creditCard'],
    //     minlength: [4, 'The credit card number is too short'],
    //     maxlength: [16, 'The credit card number is to long']
    // }

}, {
    versionKey: false, //Don't add __v field
    toJSON: { virtuals: true }, // Allow to convert virtual fields to JSON 
    id: false // don't add additional id field
});

OrderSchema.virtual("user", {
    ref: UserModel, // Which model to specify
    localField: "userId", // Foreign key of relation (in user model)
    foreignField: "_id", // Primary key of the relation (order model)
    justOne: true // Each product has one category and not many
});

OrderSchema.virtual("city", {
    ref: UserModel, // Which model to specify
    localField: "cityId", // Foreign key of relation (in Order model)
    foreignField: "_id", // Primary key of the relation (user model)
    justOne: true // Each product has one category and not many
});

// 3. Model class which mongoose create for us:
export const OrderModel = mongoose.model<IOrderModel>("OrderModel", OrderSchema, "Order") // (Name for the model, The schema to build the model from, Which collection should be addressed in the data base)
