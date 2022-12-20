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
                quantity: [this.cardDetails.quantity, [Validators.required, Validators.max(30), Validators.min(1),
                    Validators.minLength(1),Validators.maxLength(2)]],
            }
        )
    }

    onSave() {
        this.cardDetails = this.cardForm.value
        this.CartProductModel = {product: this.data.card.model, quantity:this.cardForm.value.quantity}
        this.cartService.AddToCart(this.CartProductModel)
    }

    onCloseClick() {
        this.matDialogRef.close();
    }
}
