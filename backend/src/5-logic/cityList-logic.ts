import { CityListModel, ICityList } from "../4-models/cityList-model";

// Get all cityList

async function getCityList(): Promise<ICityList[]> {
    
    return CityListModel.find().exec()
}

export default {
    getCityList
}