import mongoose from "mongoose";

// 1. Model interface describing the data:
export interface ICityList extends mongoose.Document {
    name: string;
}

// 2. Model schema describing more things about the model
export const CityListSchema = new mongoose.Schema<ICityList>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [30, "Name too long"],
        trim: true,
        unique: true
    },
}, {
    versionKey: false
});

// 3. Model class
export const CityListModel = mongoose.model<ICityList>("CityListModel", CityListSchema, "cityList")
