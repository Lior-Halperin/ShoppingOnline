import { Component , OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {  Observable, Subscription } from 'rxjs';
import { CardProductService } from 'src/app/core/card-product.service';
import { CartProductModel } from 'src/app/models/cart-product.model';

@Component({
    selector: 'app-admin-selector-sidnav',
    templateUrl: './admin-selector-sidnav.component.html',
    styleUrls: ['./admin-selector-sidnav.component.css']
})
export class AdminSelectorSidnavComponent implements OnInit {

    public showEdit = false

    changeShowEdit(){
        this.showEdit = !this.showEdit
    }
    
    private subscriptions = new Subscription // List of all subscribe
    public selectedCard$: Observable<CartProductModel[]>

    public selectedComp: boolean = true

    constructor(private cardProductService: CardProductService) { }


    ngOnInit(): void {
        this.selectedCard$ = this.cardProductService.selectedCard$
        this.cardProductService.selectedCard$.subscribe(element=>{
            if(element.length>0){
                this.selectedComp = true
            }
        })
      
    }

    openAddForm() {
        this.selectedComp = !this.selectedComp
    }
}
