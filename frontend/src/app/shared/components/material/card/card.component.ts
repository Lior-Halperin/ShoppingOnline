import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductModel } from 'src/app/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { CardProductService } from 'src/app/core/card-product.service';
import { CartProductModel } from 'src/app/models/cart-product.model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {


    @ViewChild('containerCard', { read: ViewContainerRef })
    containerCard!: ViewContainerRef

    @ViewChild('elementCard') refElementCard: ElementRef;

    test2 = ""

    createComponent() {
        console.log(this.refElementCard.nativeElement)
        this.refElementCard.nativeElement = this.test2
        this.containerCard.clear() // Cleans the container to avoid duplicates
        this.containerCard.createComponent(CardComponent) // Produces inside the container the component
        this.containerCard
    }


    products$: Observable<ProductModel[]>;

    constructor(private productService: ProductsService,
         private matDialog: MatDialog,
         private cardProductService: CardProductService,){}

    valueB = true

    ngOnInit(): void {
        this.products$ = this.productService.products$;

    }

    // Receiving the object contained in the selected card
    // and sending it to the card service for setting the global variable
    public setSelectedCard(selectedCard:any):void {
        const selectedCardToSending: CartProductModel[] = [{product:selectedCard,quantity:null}]
        this.cardProductService.setSelectedCard(selectedCardToSending)
    }




}



