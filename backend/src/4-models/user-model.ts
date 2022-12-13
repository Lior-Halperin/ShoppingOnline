import mongoose from "mongoose";
import { CityListModel } from "./cityList-model";
import Role from "./role-model";

// 1. Model interface describing the data:
export interface IUserModel extends mongoose.Document {
    userIdNumber: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cityId: mongoose.Schema.Types.ObjectId;
    street: string;
    role: Role
}

// 2. Model schema describing more things about the model
export const UserSchema = new mongoose.Schema<IUserModel>({
    userIdNumber: {
        type: Number,
        required: [true, "Missing ID"],
        minlength: [5, "ID too short"],
        maxlength: [20, "ID too long"],
        trim: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: [true, "Missing first Name"],
        minlength: [2, "First name too short"],
        maxlength: [20, "First name too long"],
        trim: true,
        lowercase: true,
        validate: [/[a-z]/, "First name must contain only English letters"]

    },
    lastName: {
        type: String,
        required: [true, "Missing last name"],
        minlength: [2, "last name too short"],
        maxlength: [20, "last name too long"],
        trim: true,
        lowercase: true,
        validate: [/[a-z]/, "last name must contain only English letters"]

    },
    email: {
        type: String,
        required: [true, "Missing email"],
        minlength: [2, "email too short"],
        maxlength: [50, "email too long"],
        trim: true,
        unique: true,
        validate: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email"]
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        minlength: [5, "password too short"],
        maxlength: [16, "password too long"],
        trim: true,
// (?=.*[0-9]) means that the password must contain a single digit from 1 to 9.
// (?=.*[a-z]) means that the password must contain one lowercase letter.
// (?=.*[A-Z]) means that the password must contain one uppercase letter.
// (?=.*\W) means that the password must contain one special character.
        validate: [/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/, "Invalid password"]
    },
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Missing city"],
    },
    street: {
        type: String,
        required: [true, "Missing street"],
        minlength: [2, "street too short"],
        maxlength: [30, "street too long"],
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
    }

},{
    versionKey: false, // Don't add __v field
    toJSON: { virtuals: true }, // Allow to convert virtual fields to JSON
    id: false // Don't add additional id field
});

// Virtual Fields
UserSchema.virtual("city", {
    ref: CityListModel, // Which model to specify
    localField: "cityId", // Foreign key of the relation (in user model)
    foreignField: "_id", // Primary key of the relation (city list model)
    justOne: true // Each user has one city and not many
});

// 3. Model class which mongoose create for us:
export const UserModel = mongoose.model<IUserModel>("UserModel", UserSchema, "users") // (Name of the model, The schema to build the model from, Which collection should be addressed in the data base)



