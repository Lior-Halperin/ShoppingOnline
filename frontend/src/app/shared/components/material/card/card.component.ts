import { Component, ElementRef, Input, AfterViewInit, OnInit, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductModel } from 'src/app/models/product.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAnimationsComponent } from '../dialog/dialog-animations/dialog-animations.component';
import { DialogModel } from 'src/app/shared/models/dialog.model';
import { CardProductService } from 'src/app/core/card-product.service';
import { CartProductModel } from 'src/app/models/cart-product.model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {


    // deleter:boolean = true;
    @ViewChild('containerCard', { read: ViewContainerRef })
    containerCard!: ViewContainerRef

    @ViewChild('elementCard') refElementCard: ElementRef;

    test2 = ""

    // async importRouter() {
    //     const componentConfig =this.refElementCard;
    //     const componentInstance = await componentConfig.productsHomeComponent()
    //     const componentRef =  this.containerCard.createEmbeddedView(componentConfig);

    // }

    // ngAfterViewInit(): void {
    //     this.importRouter() 
    //         // this.dropdownBoxComponent.selectControl.setValue('62e2a895d599b19de53ffbcb')
    // }

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
        // this.templateRef = 
        // this.containerCard.createEmbeddedView(this.templateRef)
        //   this.products$.subscribe(x=>console.log(x))
    }

    // Receiving the object contained in the selected card
    // and sending it to the card service for setting the global variable
    public setSelectedCard(selectedCard:any):void {
        const selectedCardToSending: CartProductModel[] = [{product:selectedCard,quantity:null}]
        this.cardProductService.setSelectedCard(selectedCardToSending)
    }


    // testClick(a: any) {
    //     // console.log(`test click`)
    //     console.log(a)
    //     this.matDialog.open(DialogAnimationsComponent, {
    //         data: {
    //             card: {
    //                 model: a,
    //             },
    //             introduction: {
    //                 lazyLoading: "introduction"
    //             }
    //         },
    //         width: '250px', 
    //     });
    // }

    // openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    //     this.dialog.open(DialogAnimationsExampleDialog, {
    //       width: '250px',
    //       enterAnimationDuration,
    //       exitAnimationDuration,
    //     });
    //   }
    // }

}


//     // @Input() name: string | undefined
    // @Input() product: ProductModel | undefined
//     // public product: ProductModel;

//       constructor() { }

//   ngOnInit(): void {
//   }
