import { CartProductModel } from "./cart-product.model";

export interface CartModel {
    categoryName: string,
    cartItems: [CartProductModel]
}
