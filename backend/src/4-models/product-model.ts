import { UploadedFile } from "express-fileupload";
import mongoose from "mongoose";
import { CategoryModel } from "./category-model";

// 1. Model interface describing the data:
export interface IProductModel extends mongoose.Document {
    // No need to specify _id - Primary Key
    name: string;
    price: number;
    categoryId: mongoose.Schema.Types.ObjectId; // Foreign Key
    imageName: string;
    image: object;
}

// 2. Model schema describing more things about the model (validation, constraints...)
export const ProductSchema = new mongoose.Schema<IProductModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [100, "Name too long"],
        trim: true, // Removes whitespace from the beginning and end of the string.
        unique: true,
        validate:[/[a-z]/,"Name must contain only English letters"]
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        minlength: [2, "Price can't be negative"],
        maxlength: [2000, "Price can't exceed 2000 "]
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId
    },
    imageName: {
        type:String
    },
    image: {
        type: Object

    }
}, {
    versionKey: false, // Don't add __v field
    toJSON: { virtuals: true }, // Allow to convert virtual fields to JSON
    id: false // Don't add additional id field
});

// Virtual Fields
ProductSchema.virtual("productCategory", {
    ref: CategoryModel, // Which model to specify
    localField: "categoryId", // Foreign key of the relation (in product model)
    foreignField: "_id", // Primary key of the relation (category model)
    justOne: true // Each product has one category and not many
});


// 3. Model class which mongoose create for us:
export const ProductModel = mongoose.model<IProductModel>("ProductModel", ProductSchema, "products"); // (Name of the model, The schema to build the model from, Which collection should be addressed in the data base) 
