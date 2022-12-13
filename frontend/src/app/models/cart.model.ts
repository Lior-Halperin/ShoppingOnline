import { CartProductModel } from "./cart-product.model";
import { ProductModel } from "./product.model";

export interface CartModel {
    categoryName: string,
    cartItems: [CartProductModel]
}
//
// export interface CartModel {
//     // id: string,
//     product: ProductModel,
//     quantity:number
// }
