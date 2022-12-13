import { ProductModel } from "./product.model";

export interface CartProductModel {
    // productName: string,
    product: ProductModel,
    quantity:number
}
