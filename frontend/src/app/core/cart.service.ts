import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartProductModel } from '../models/cart-product.model';
import { CartModel } from '../models/cart.model';
import { OrderedItemModel } from '../models/ordered-item.model';
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

    //////////////////////////////--- Old functions to delete----///////////////////////////////

    private categoryProductsMap = new Map<string, any>();
    private productsMap = new Map<string, any>();

    private cartProductsMap = new Map<string, CartProductModel[]>([])
    private cartModelMap = new Map<string, CartProductModel[]>([])

    private testMapToObj(mapObj: any) {

        const requestedObject: any = {};
        console.group('CRD SERVICR: testMapToObj')
        console.log(mapObj)
        console.groupEnd()

        for (let [parentKye, parentValue] of mapObj) {
            // console.log(parentKye)
            // console.log(parentValue[0].product)
            // requestedObject.push({[parentKye]:parentValue[0]})
            for (let o in parentValue) {
                requestedObject[parentKye] = { [parentValue[o].product.name]: parentValue[o] }

                // console.log(o)

                //     objParent[parentKye] = parentValue[k]

                // requestedObject.push({[parentKye]:parentValue[o]})
            }
            // for (let [childKey, childValue] of parentValue) {

            // }
        }
        console.log(requestedObject)
        // for (let [parentKye, parentValue] of mapObj) {
        //     for (let [childKey, childValue] of parentValue) {
        //         console.log(childKey)
        //         console.log(childValue)
        //         console.log(parentKye,':',childValue)

        //         // requestedObject[parentKye] = { [childKey]: childValue }
        //     }
        // }
    }

    ///////////


    public addToCart(item: CartProductModel): void {
        // public addToCart(item: CartProductModel): void {

        // const productName = item.product.name
        // const categoryName = item.product.productCategory.name;
        // const productName = item.cartItem.product.name
        // const categoryName = item.categoryName;

        const getCartFromStorage = localStorage.getItem('testCart')

        console.log('----2---')
        console.log(getCartFromStorage)
        if (this.cartModelMap.has(item.product.productCategory.name)) {
            const lastItem = this.cartModelMap.get(item.product.productCategory.name)
            lastItem.push(item)
            this.cartModelMap.set(item.product.productCategory.name, lastItem)
            console.log(this.cartModelMap)

        }
        else {
            this.cartModelMap.set(item.product.productCategory.name, [item])
            console.log('----3----')
            console.log(this.cartModelMap)

        }
        // this.cartSubject.next()

        console.log(this.cartModelMap)

        // console.log(JSON.parse(localStorage.getItem('cart')))

        // if (getCartFromStorage != null) {
        //     const parseCart = JSON.parse(localStorage.getItem('cart'))
        //     for (let k in parseCart) {
        //         console.log(k)
        //         console.log(parseCart[k])
        //         for (let c in parseCart[k]) {
        //             console.group('parse child')
        //             console.log(c)
        //             console.log(parseCart[k][c])
        //             console.groupEnd()
        //         }
        //     }
        //     const cartObjToMap = new Map()
        //     // console.log(cartObjToMap)
        // }

        // this.cartProductsMap.set(item.cartItem.productName,[item.cartItem])
        // this.cartModelMap.set(item.categoryName,[item])
        /////////////////////////
        // if (this.cartModelMap.has(item.categoryName)){
        //     const lastItem = this.cartModelMap.get(item.categoryName)
        //     lastItem.push(item)
        //     this.cartModelMap.set(item.categoryName,lastItem)
        // }
        // else{
        //     this.cartModelMap.set(item.categoryName,[item]) 
        // }
        // console.log(this.cartModelMap)
        /////////////////
        // this.cartModelMap.set(item.categoryName,[this.cartProductsMap])
        // if (this.cartModelMap.has(item.categoryName)){
        //     console.log('----2---')
        //     // console.log(true,item.categoryName)
        //     console.log(this.cartModelMap)
        //     this.cartProductsMap.set(item.cartItem.productName,[item.cartItem])
        //     this.cartModelMap.set(item.categoryName,[this.cartProductsMap])
        // }
        // else {
        //     this.cartProductsMap.set(item.cartItem.productName,[item.cartItem])
        //     this.cartModelMap.set(item.categoryName,[this.cartProductsMap])
        //     console.log('----3---')
        //     console.log(this.cartModelMap)
        // }
        if (getCartFromStorage != null) {
            const parseCart = JSON.parse(localStorage.getItem('cart'))
            for (let k in parseCart) {
                // console.log(k)
                // console.log(parseCart[k])
                for (let c in parseCart[k]) {
                    // console.group('parse child')
                    // console.log(c)
                    // console.log(parseCart[k][c])
                    // console.groupEnd()
                }
            }
            const cartObjToMap = new Map()
            // console.log(cartObjToMap)
        }
        else {
            localStorage.setItem('cart', JSON.stringify(item))
            // console.log(item)
            // console.log(item.categoryName)
            // console.log(item.cartItem.product.name)

        }


        // this.productsMap.set(productName, item)
        // console.log(this.productsMap)
        // if (this.categoryProductsMap.has)

        // this.categoryProductsMap.set(categoryName, this.productsMap)

        // console.group('categoryProductsMap')
        // console.log(this.categoryProductsMap)
        // console.groupEnd()

        // console.group('productsMap')
        // console.log(this.productsMap)
        // // console.log(this.productsMap.get('Coke').quantity)
        // // console.log(this.categoryProductsMap.get('Drinks').has('Coke'))
        // // console.log(product)
        // console.groupEnd()



        // console.log(this.categoryProductsMap)
        // console.log((this.mapToObj(this.categoryProductsMap)))
        // console.log(JSON.stringify(this.categoryProductsMap))


        //*** */ localStorage.setItem('cart', JSON.stringify(this.mapToObj(this.categoryProductsMap)))

        const cartTest = JSON.parse(localStorage.getItem('cart'))
        // console.group('test parse')
        // cartTest['lior'] = { p: 1 }
        // console.log(cartTest)
        // console.groupEnd()
    }

    private mapToObj(map: any) {
        const objParent: any = {}
        const objChild: any = {}

        // for (let [parentKye, parentValue] of map){
        //     objParent[parentKye] = parentValue
        // for (let [k, v] of parentValue){
        //     objChild[k] = v
        // }
        for (let [parentKye, parentValue] of map) {
            for (let [childKey, childValue] of parentValue) {
                // console.log(childKey)
                // console.log(childValue)
                // console.log(parentKye,':',childValue)

                objParent[parentKye] = { [childKey]: childValue }
            }
            // for(let k in parentValue){
            //     // console.log(k)
            //     objParent[parentKye] = parentValue[k]
            // }
            // objParent[parentKye] = parentValue
        }
        // console.log(objParent)

        //     for (let k in objParent){
        //         console.log(k,222222222)
        //         console.log(objParent[k],3333333)
        // for(let [o,v] of objParent[k]){
        //     console.log(v)
        // }
        //         objChild[k] = v
        //     }
        // console.group('11111111111')
        // console.log(objParent)
        // console.log(objChild)
        // console.groupEnd()

        return objParent
    }






}
