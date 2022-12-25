import mongoose from "mongoose";
import { ProductModel } from "./product-model";
import { OrderModel } from "./order-model";

// 1. Model interface describing the data:
export interface IOrderedItemModel extends mongoose.Document {

    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    Price: number;
    orderId: mongoose.Schema.Types.ObjectId; // Foreign Key
}

// 2. Model schema describing more things about the model (validation, constraints...)
export const OrderedItemSchema = new mongoose.Schema<IOrderedItemModel>({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    quantity: {
        type: Number,
        required: [true, "Missing quantity"],
        min: [1, "The quantity must be positive"],
        max: [1000, "Price can't exceed 1000"]
    },
    Price: {
        type: Number,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Missing order id number']
    }

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

// Virtual Fields
OrderedItemSchema.virtual("order", {
    ref: OrderModel, // Which model to specify
    localField: "orderId", // Foreign key of relation (in order model)
    foreignField: "_id", // Primary key of the relation ( order item model)
    justOne: true,
});

OrderedItemSchema.virtual("productDetails", {
    ref: ProductModel, // Which model to specify
    localField: "productId", // Foreign key of relation (in product model)
    foreignField: "_id",
    justOne: true,
});

// 3. Model class which mongoose create for us:
export const OrderedItemModel = mongoose.model<IOrderedItemModel>("OrderedItemModel", OrderedItemSchema, "OrderedItem")