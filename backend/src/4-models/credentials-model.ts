import mongoose from "mongoose";
import Role from "./role-model";

// 1. Model interface describing the data:
export interface ICredentials extends mongoose.Document {
    email: string;
    password: string;
}

// 2. Model schema describing more things about the model
export const CredentialsSchema = new mongoose.Schema<ICredentials>({

    email: {
        type: String,
        required: [true, "Missing email"],
        minlength: [2, "Incorrect username or password Please try again"],
        maxlength: [50, "Incorrect username or password Please try again"],
        trim: true,
        validate: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Incorrect username or password Please try again"]
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        minlength: [4, "Incorrect username or password Please try again"],
        maxlength: [16, "Incorrect username or password Please try again"],
        trim: true,
//// (?=.*[0-9]) means that the password must contain a single digit from 1 to 9.
//// (?=.*[a-z]) means that the password must contain one lowercase letter.
//// (?=.*[A-Z]) means that the password must contain one uppercase letter.
//// (?=.*\W) means that the password must contain one special character.
        validate: [/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/, "Incorrect username or password Please try again"]
    },

},{
    versionKey: false, // Don't add __v field
});


// 3. Model class which mongoose create for us:
export const CredentialsModel = mongoose.model<ICredentials>("CredentialsModel", CredentialsSchema, "users") // (Name of the model, The schema to build the model from, Which collection should be addressed in the data base)



