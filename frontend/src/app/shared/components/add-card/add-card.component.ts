import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardProductService } from 'src/app/core/card-product.service';
import { map, Observable, Subscription, filter } from 'rxjs'
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/core/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/models/product.model';
import { NotificationService } from 'src/app/core/notification.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

    constructor( 
        private categoryService: CategoryService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService, private productsService: ProductsService) { }

    @ViewChild("imageFile")
    public imageFileRef: ElementRef<HTMLInputElement>;

    public addForm: FormGroup;
    
    private addDetails: ProductModel =
        { _id: '', name: null, price: null, categoryId: '', imageName: '', productCategory: { _id: '', name: '' }, image: null }


    public imageUrl = '';

    public categoryList$: Observable<CategoryModel[]>; // List of all categories


    ngOnInit(): void {
        this.categoryList$ = this.categoryService.categoryList$

        this.addForm = this.formBuilder.group(
            {
                name: [this.addDetails.name, [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
                price: [this.addDetails.price, [Validators.required, Validators.max(5000), Validators.min(1)]],
                categoryId: [this.addDetails.categoryId, [Validators.required]],
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
                case this.addForm.controls[controllerName].hasError(errorType):
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
            reader.onload = (event: any) => {
                this.imageUrl = event.target.result
            }
        }
    }

    public save(): void {
        try {

            let toSend: any = this.addDetails;

            for (let [key, value] of Object.entries(this.addForm.value)) {
                toSend[`${key}`] = value
            }
            this.addDetails = toSend
            this.addDetails.image = this.imageFileRef.nativeElement.files[0];
            delete this.addDetails.imageName
            this.productsService.addProduct(this.addDetails)
        }
        catch (err: any) {
            this.notificationService.showNotification(err, 'error')
        }

    }



}
