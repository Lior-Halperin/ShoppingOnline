import mongoose from "mongoose";
import { ProductModel } from "./product-model";

// 1. Model interface describing the data:
export interface ICartItemModel extends mongoose.Document {

    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    totalPrice: number;
    shoppingCartId: mongoose.Schema.Types.ObjectId;
}

// 2. Model schema describing more things about the model (validation, constraints...)
export const CartItemSchema = new mongoose.Schema<ICartItemModel>({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    quantity:{
        type: Number,
        required: [true, "Missing quantity"],
        min: [1, "The quantity must be positive"],
        max: [1000, "Price can't exceed 1000"]
    }, 
    totalPrice:{
        type: Number,
    },
    shoppingCartId:{
        type: mongoose.Schema.Types.ObjectId,
    }

}, {
    versionKey: false,
    toJSON: { virtuals: true},
    id: false
});

// Virtual Fields
CartItemSchema.virtual("product", {
    ref: ProductModel,
    localField: "productId",
    foreignField: "_id",
    justOne:true,
});

// 3. Model class which mongoose create for us:
export const CartItemModel = mongoose.model<ICartItemModel>("CartItemModel", CartItemSchema, "cartItem")