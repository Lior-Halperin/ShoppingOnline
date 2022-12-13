import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModel, } from 'src/app/shared/models/dialog.model';
import { CartService } from 'src/app/core/cart.service';
import { CartProductModel } from 'src/app/models/cart-product.model';

@Component({
    selector: 'app-dialog-animations',
    templateUrl: './dialog-animations.component.html',
    styleUrls: ['./dialog-animations.component.css']
})
export class DialogAnimationsComponent implements OnInit {


    value = 'Clear me';
    // cartModel: CartModel
    CartProductModel: CartProductModel


    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogModel,
        private matDialogRef: MatDialogRef<DialogAnimationsComponent>,
        private formBuilder: FormBuilder, private cartService: CartService
    ) { }

    cardDetails = { quantity: 1 }

    cardForm: FormGroup;

    ngOnInit(): void {
        this.cardForm = this.formBuilder.group(
            {
                quantity: [this.cardDetails.quantity, [Validators.required, Validators.max(100), Validators.minLength(1)]],
            }
        )
    }

    //this.lastLoaded.set(id, products)
    onSave() {
        this.cardDetails = this.cardForm.value
        this.CartProductModel = {product: this.data.card.model, quantity:this.cardForm.value.quantity}
        this.cartService.AddToCart(this.CartProductModel)
        // this.onCloseClick()
        // console.log(`test cart 1234` , this.cardDetails)
        // this.cartModel.id = this.cardForm.value
        // this.cartModel = {id: this.data.card.model._id,product: this.data.card.model,quantity:this.cardForm.value.quantity}
        // console.log(this.cartModel)

        //////////
        // this.cartModel = {product: this.data.card.model,quantity:this.cardForm.value.quantity}
        // this.cartService.addToCart(this.cartModel)
        // this.cartModel = {productName:this.data.card.model.name ,product: this.data.card.model, quantity:this.cardForm.value.quantity}
        // this.cartModel = {categoryName: this.data.card.model.productCategory.name ,cartItem: {productName:this.data.card.model.name ,product: this.data.card.model, quantity:this.cardForm.value.quantity}}


        // this.cartService.addToCart(this.CartProductModel)

        ///////

        // this.cartModel.quantity = this.cardForm.value
        // console.group(`cardDetails`)
        // console.log(this.cardForm.value)
        // console.log(this.data.card.model)
        // console.groupEnd()
        // this.authService.login(this.credentials)
    }

    onCloseClick() {
        this.matDialogRef.close();
        console.log('fd')
    }
}
