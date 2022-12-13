import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { CartProductModel } from '../models/cart-product.model';

@Injectable({
    providedIn: 'root'
})
export class CardProductService {

    private selectedCardSubject = new BehaviorSubject<CartProductModel[]>([])

    get selectedCard$(): Observable<CartProductModel[]> {
        return this.selectedCardSubject.asObservable();
    }

    // set the global variable of the selected card
    public setSelectedCard(product: CartProductModel[]): void {
        console.log('CardProductService => setSelectedCard',product)
        this.selectedCardSubject.next(product)
    }

    constructor() { }
}
