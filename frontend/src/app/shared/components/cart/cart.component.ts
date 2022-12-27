import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/cart.service';
import { CartModel } from 'src/app/models/cart.model';
import { Observable } from 'rxjs';
import { CartProductModel } from 'src/app/models/cart-product.model';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    public cart$: Observable<CartModel[]>
    public totalPrice$: Observable<number>

    constructor(private cartService: CartService) { }

    ngOnInit(): void {

        this.cart$ = this.cartService.cart$
        this.totalPrice$ = this.cartService.totalPrice$
    }

    deleteAllItems(): void {
        this.cartService.DeleteAllItemsFromCart()
    }

    deleteItem(item: CartProductModel): void {
        this.cartService.DeleteItemFromCart(item)
    }

    checkout(){
        this.cartService.sendOrder()
    }
}
