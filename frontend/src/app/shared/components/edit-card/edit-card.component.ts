import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardProductService } from 'src/app/core/card-product.service';
import { CartProductModel } from 'src/app/models/cart-product.model';
import { map, Observable, Subscription, filter } from 'rxjs'
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/core/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/models/product.model';
import { NotificationService } from 'src/app/core/notification.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
    selector: 'app-edit-card',
    templateUrl: './edit-card.component.html',
    styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {

    constructor(private cardProductService: CardProductService,
        private categoryService: CategoryService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService, private productsService: ProductsService) { }

    @ViewChild("imageFile")
    public imageFileRef: ElementRef<HTMLInputElement>;

    public editForm: FormGroup;

    private editDetails: ProductModel =
        { _id: '', name: null, price: null, categoryId: '', imageName: '', productCategory: { _id: '', name: '' }, image: null }

    private subscriptions = new Subscription // List of all subscribe

    public imageUrl = '';

    public selectedCard$: Observable<CartProductModel[]>
    public categoryList$: Observable<CategoryModel[]>; // List of all categories



    ngOnInit(): void {
        this.categoryList$ = this.categoryService.categoryList$
        this.selectedCard$ = this.cardProductService.selectedCard$

        const setEditForm = this.cardProductService.selectedCard$.pipe(map(i => i), filter(i => i.length > 0)).subscribe(i => {
            for (let item of i) {
                this.editForm.setValue({ name: item.product.name, price: `${item.product.price}`, category: item.product.categoryId })
                this.editDetails = item.product
                // Set the first image from selected card
                this.imageUrl = item.product.imageName

            }
        })
        this.subscriptions.add(setEditForm)

        this.editForm = this.formBuilder.group(
            {
                name: [this.editDetails.name, [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
                price: [this.editDetails.price, [Validators.required, Validators.max(5000), Validators.min(1)]],
                category: [this.editDetails.categoryId, [Validators.required]],
            }
        )

    }

    // The following function returns an error message under the input
    getErrorMessage(controllerName: string) {
        const validList = new Map([
            ['required', 'You must enter a value'],
            ['minlength', 'You have passed the minimum required characters'],
            ['maxlength', 'You have exceeded the maximum number of characters required'],
            ['min', 'The price you selected is not in the minimum range'],
            ['max', 'The price you selected is not in the maximum range'],
        ])
        let errorMessage = '';

        for (let [errorType, message] of validList) {
            switch (true) {
                case this.editForm.controls[controllerName].hasError(errorType):
                    // console.log(errorType, message)
                    errorMessage = message
                    break;
            }
        }
        return errorMessage
    }


    // This function instantly sets the image view to the uploaded image
    onselectFile(selectedFile: any) {
        if (selectedFile.target.files) {
            const reader = new FileReader
            reader.readAsDataURL(selectedFile.target.files[0]);
            console.log('img2',selectedFile.target.files[0])
            reader.onload = (event: any) => {
                this.imageUrl = event.target.result
            }
        }
    }

    public save(): void {
        try {

            let toSend: any = this.editDetails;

            for (let [key, value] of Object.entries(this.editForm.value)) {
                console.log(key, value)
                toSend[`${key}`] = value
            }
            this.editDetails = toSend
            // console.log('img:',this.imageFileRef.nativeElement.files[0])
            this.editDetails.image = this.imageFileRef.nativeElement.files[0];
            delete this.editDetails.imageName
            // console.log('editDetails: ', this.editDetails)
            this.productsService.editProduct(this.editDetails)
        }
        catch (err: any) {
            this.notificationService.showNotification(err, 'error')
        }

    }



}
