import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardProductService } from 'src/app/core/card-product.service';
import { Observable, map, filter, Subscription } from 'rxjs'
import { CartProductModel } from 'src/app/models/cart-product.model';
import { DialogAnimationsComponent } from 'src/app/shared/components/material/dialog/dialog-animations/dialog-animations.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    // styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {

    selectedCard$: Observable<CartProductModel[]>
    private subscriptions = new Subscription // List of all subscribe
    test: any = null

    constructor(private cardProductService: CardProductService, private matDialog: MatDialog) { }

    ngOnInit(): void {

        this.selectedCard$ = this.cardProductService.selectedCard$
        const selectedCard = this.selectedCard$.pipe(map(i => i), filter(i => i !== null)).subscribe(item => {
            item.length > 0 && this.openDialogCard(item[0])
        });
        this.subscriptions.add(selectedCard)
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    
    openDialogCard(item: CartProductModel) {

        this.matDialog.open(DialogAnimationsComponent, {
            data: {
                card: {
                    model: item.product,
                }
            },
            width: '250px',
        });
    }


}
