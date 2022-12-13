import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { ProductModel } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { NotificationService } from '../notification.service';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {


    private productsSubject = new BehaviorSubject<ProductModel[]>([]); // BehaviorSubject Updates those who have subscribe for the event what the current value is now and will continue to update when it changes

    get products$(): Observable<ProductModel[]> { // Used to listen only, not to throw event.
        return this.productsSubject.asObservable();
    };

    private serverUrl = environment.serverUrl;

    // Complexity O(1)
    // private lastLoaded = new Map<string, ProductModel[]>([]);
    private lastLoaded = new Map<string, ProductModel[]>([]);

    // Get products by category id:
    public async loadProductsByCategoryId(id: string) {
        try {
            let products = [];
            // In order to reduce requests to the server - checks if the information exists and returns if so. 
            if (this.lastLoaded.has(id)) {
                products = this.lastLoaded.get(id);
            }
            else {
                products = await firstValueFrom(this.httpClient.get<ProductModel[]>(`${this.serverUrl}products/category/${id}`));
                this.lastLoaded.size >= 3 ? this.lastLoaded.clear() : this.lastLoaded.set(id, products);

                products.forEach(element => element.imageName = `${this.serverUrl}products/images/${element.imageName}`) // Changing the image name to a url
            }
            this.productsSubject.next(products)
            // console.log('productsSubject: ',this.productsSubject.value)

            return products; // Returns the products to those who want, but the essence of the function is in the distribution of the information.
        }
        catch (err: any) {
            return this.notificationService.showNotification(err, 'error')

        }

    };

    // PATCH - edit product
    public async editProduct(productToEdit:ProductModel) {
        try {
            const formData = new FormData();
            delete productToEdit.productCategory
            for(let [key,value] of Object.entries(productToEdit)){
                formData.append(key,value)
            }
            
            console.log('product to edit: ',productToEdit)
            console.log(`${this.serverUrl}products/${productToEdit._id}`)
           const resultEdit = await firstValueFrom(this.httpClient.patch<ProductModel[]>(`${this.serverUrl}products/${productToEdit._id}`,formData));

            this.notificationService.showNotification('Successfully updated', 'success')

        }
        catch (err: any) {
            this.notificationService.showNotification(err, 'error')

        }

    }

    public async addProduct(productToAdd:ProductModel) {
        try {
            console.log('productToAdd',productToAdd)
            const formData = new FormData();
            delete productToAdd.productCategory
            delete productToAdd._id

            for(let [key,value] of Object.entries(productToAdd)){
                formData.append(key,value)
            }
            await firstValueFrom(this.httpClient.post<ProductModel[]>(`${this.serverUrl}products`,formData));

            this.notificationService.showNotification('Successfully updated', 'success')

        }
        catch (err: any) {
            this.notificationService.showNotification(err, 'error')

        }

    }

    // public async loadProducts(): Promise<ProductModel[]> {
    //     const products = await firstValueFrom(this.httpClient.get<ProductModel[]>(`${this.serverUrl}products`));
    //     console.group("load Products")
    //     console.log("auth service: ","loadProducts")
    //     console.log(products)
    //     console.groupEnd()
    //     this.productsSubject.next(products);
    //     return products; // Returns the products to those who want, but the essence of the function is in the distribution of the information.
    // };

    public async deleteProduct(id: string): Promise<any> {
        await firstValueFrom(this.httpClient.delete<any>(`${this.serverUrl}products/${id}`));
        // await this.loadProducts(); //// You can also not wait because the component will be updated anyway
    }



    constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }
}


// ---------------------------------------------------------------
// export class ProductsService {

//     private productsSubject = new BehaviorSubject<ProductModel[]>([]); // BehaviorSubject Updates those who have subscribe for the event what the current value is now and will continue to update when it changes

//     get products$(): Observable<ProductModel[]> { // Used to listen only, not to throw event.
//         return this.productsSubject.asObservable();
//     };

//     private serverUrl = environment.serverUrl;

//     public async loadProducts(): Promise<ProductModel[]> {
//         const products = await firstValueFrom(this.httpClient.get<ProductModel[]>(`${this.serverUrl}products`));
//         this.productsSubject.next(products);
//         return products; // Returns the products to those who want, but the essence of the function is in the distribution of the information.
//     };

//     public async deleteProduct(id: number): Promise<any> {
//         await firstValueFrom(this.httpClient.delete<any>(`${this.serverUrl}products/${id}`));
//         await this.loadProducts(); // You can also not wait because the component will be updated anyway
//     }



//     constructor(private httpClient: HttpClient) { } 
// }
//----------------------------------------------------------------------