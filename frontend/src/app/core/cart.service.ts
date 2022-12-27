import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartProductModel } from '../models/cart-product.model';
import { CartModel } from '../models/cart.model';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    // Global state of cart
    private cartSubject = new BehaviorSubject<CartModel[]>([]);

    get cart$(): Observable<CartModel[]> {
        return this.cartSubject.asObservable();
    };

    // Global state of total price

    private totalPriceSubject = new BehaviorSubject<number>(0)

    get totalPrice$(): Observable<number> {
        return this.totalPriceSubject.asObservable();
    };

    private serverUrl = environment.serverUrl;

    // Adding a product to the shopping cart in the global variable:
    public AddToCart(itemToAdd: CartProductModel): void {


        try {

            let globalStateCart: CartModel[] = this.cartSubject.value
            const itemCategoryName = itemToAdd.product.productCategory.name;
            const isCartFull = globalStateCart.length > 0;
            const globalStateTotalPrice = this.totalPriceSubject.value

            // If there is no active cart or the category of the item or the item itself does not exist in the cart, the variable will be equal
            // to the data received  from the function "calculationTotalPrice":
            let itemTotalPrice: number = this.calculationTotalPrice(itemToAdd.product.price, itemToAdd.quantity);


            if (isCartFull) { // A.1: Checks if there is an active cart in the global variable

                let indexItemInGlobalVar = null;
                const indexCategoryInGlobalVar = globalStateCart.findIndex((element) => element.categoryName === itemCategoryName)

                if (indexCategoryInGlobalVar >= 0) { // B.1: if category of the added product exists in the global
                    indexItemInGlobalVar = globalStateCart[indexCategoryInGlobalVar].cartItems.findIndex((element) => element.product._id === itemToAdd.product._id)

                    if (indexItemInGlobalVar >= 0) { // c.1: if the added product is already in the cart, replace it with the added product

                        //if new quantity > 0 then itemTotalPrice = price * ((new quantity)-(old quantity))
                        itemToAdd.quantity >= 0 ? itemTotalPrice = this.calculationTotalPrice(itemToAdd.product.price, ((itemToAdd.quantity) - (globalStateCart[indexCategoryInGlobalVar].cartItems[indexItemInGlobalVar].quantity))) : itemTotalPrice = 0;

                        globalStateCart[indexCategoryInGlobalVar].cartItems[indexItemInGlobalVar] = itemToAdd

                    }
                    else { // c.2
                        globalStateCart[indexCategoryInGlobalVar].cartItems.push(itemToAdd)

                    }

                }
                else { // B.2: If the category of the added product is does not exist
                    globalStateCart.push({ categoryName: itemCategoryName, cartItems: [itemToAdd] })

                }
            }
            else { // A.2: If there no existing shopping cart'
                globalStateCart = [{ categoryName: itemCategoryName, cartItems: [itemToAdd] }]

            }
            this.cartSubject.next(globalStateCart)

            // calculating the price of the item added to the cart and updating the total price state variable:
            this.totalPriceSubject.next(globalStateTotalPrice + itemTotalPrice)

            this.notificationService.showNotification('New product added to cart', 'success')

        }

        catch (err: any) {

            this.notificationService.showNotification(err, 'error')

        }


    }


    // Set cart from global state variable (this function is performed when the page is loaded or refreshed )
    public updateCartOnLocalStorage(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartSubject.value))
    }


    // Loading the shopping cart from the store. this function is performed after the page is loaded.
    public loadCartFromStorage(): void {

        try {
            // 1. Get the cart from localStorage
            const getCartFromStorage = localStorage.getItem('cart')

            // 2. If there is a cart in local storage
            if (getCartFromStorage) {
                // 2.1 make an assignment to the global variable.
                this.cartSubject.next(JSON.parse(getCartFromStorage))

                // 2.2 Calculation  of total price
                this.totalPriceFromObj(JSON.parse(getCartFromStorage))

            }
        }
        catch (err: any) {
            this.notificationService.showNotification('The attempt to load the last cart failed', 'error')
        }

    }

    // ** Need to fix there is code duplication
    // Delete single item from the cart
    public DeleteItemFromCart(itemToDelete: CartProductModel): void {

        try {
            let globalStateCart: CartModel[] = this.cartSubject.value
            const itemCategoryName = itemToDelete.product.productCategory.name;
            const globalStateTotalPrice = this.totalPriceSubject.value

            // Subtracts from the variable that holds the total price the item sent for deletion.


            // calculating the price of the item added to the cart and updating the total price state variable:
            const itemTotalPrice = this.calculationTotalPrice(itemToDelete.product.price, itemToDelete.quantity)
            this.totalPriceSubject.next(globalStateTotalPrice - itemTotalPrice)


            let indexItemInGlobalVar = null;
            const indexCategoryInGlobalVar = globalStateCart.findIndex((element) => element.categoryName === itemCategoryName)

            indexItemInGlobalVar = globalStateCart[indexCategoryInGlobalVar].cartItems.findIndex((element) => element.product._id === itemToDelete.product._id)

            // If the item does exist in the global variable then delete it
            indexItemInGlobalVar > 0 && this.totalPriceSubject.next(globalStateTotalPrice - itemTotalPrice)

            // If the category has more than one item, delete only the specific item, otherwise delete the entire category.
            if (globalStateCart[indexCategoryInGlobalVar].cartItems.length > 1) {
                globalStateCart[indexCategoryInGlobalVar].cartItems.splice(indexItemInGlobalVar, 1) // Execution of the deletion on the item index.  
            }
            else {
                globalStateCart.splice(indexCategoryInGlobalVar, 1) // Execution of the deletion on the category index.
            }
            this.notificationService.showNotification('The product has been successfully removed from the cart', 'success')
        }
        catch (err: any) {
            this.notificationService.showNotification('The product you selected was not removed, please try again.', 'error')
        }

    }

    // Delete all items from the cart and reset the total price:
    public DeleteAllItemsFromCart(): void {

        try {
            this.cartSubject.next([])
            this.totalPriceSubject.next(0)
            this.notificationService.showNotification('All products have been removed from the cart', 'success')

        }
        catch (err: any) {
            this.notificationService.showNotification('We could not remove all products from the cart, please try again', 'error')
        }


    }

    // Calculates the total price for internal function A and B
    private calculationTotalPrice(price: number, quantity: number): number {

        return price * quantity
    }

    // Total price calculation
    public totalPriceFromObj(cartObj: CartModel[]) {

        let totalPrice: number = null;

        if (cartObj.length > 0) {
            cartObj.forEach(cartObjElement => {


                cartObjElement.cartItems.forEach(cartItemsElement => {
                    totalPrice = totalPrice + cartItemsElement.product.price * cartItemsElement.quantity
                })
            })

            this.totalPriceSubject.next(totalPrice)
        }

    };


    public async sendOrder() {

        try {
            const token = localStorage.getItem('token')
            const orderedItemsCollection: any = [];

            // If there are products in the cart then continue: 
            if (this.cartSubject.value.length > 0) {

                // A loop that works for each category of products collection:
                this.cartSubject.value.forEach(elementCart => {

                    // This loop tuns on each product from the collection of products
                    // in the category, builds an orderedItem object from it and pushes 
                    // it to the array of orderedItemsCollection
                    elementCart.cartItems.forEach(elementItems => {
                        orderedItemsCollection.push(
                            {
                                productId: elementItems.product._id,
                                quantity: elementItems.quantity,
                                Price: elementItems.product.price,
                                orderId: undefined
                            }
                        )

                    });

                });
            }
            const response = await firstValueFrom(this.httpClient.post<any>(`${this.serverUrl}/order`, orderedItemsCollection))
            this.notificationService.showNotification('Your order has been updated in the system', 'success')

           this.cartSubject.next([]) // Delete the cart
        }
        catch (err) {
            this.notificationService.showNotification('Sending your order failed, please check your order details and try again ', 'error')

        }


    }

    constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }

}
