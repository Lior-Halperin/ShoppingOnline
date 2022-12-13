import { CategoryModel, ICategoryModel } from "../4-models/category-model";

// Get all categoryList

async function getCategoryList(): Promise<ICategoryModel[]> {
    
    return CategoryModel.find().exec()
}

export default {
    getCategoryList
}