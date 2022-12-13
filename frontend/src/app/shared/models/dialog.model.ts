import { ProductModel } from "src/app/models/product.model"

export interface DialogModel {
    card:{
        model:ProductModel
    },
    introduction:{
        lazyLoading:string
    }
}
