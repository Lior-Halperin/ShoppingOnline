import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { CategoryService } from 'src/app/core/category.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { CategoryModel } from 'src/app/models/category.model';
import {  Observable } from 'rxjs';

@Component({
    selector: 'app-dropdown-box',
    templateUrl: './dropdown-box.component.html',
    styleUrls: ['./dropdown-box.component.css']
})
export class DropdownBoxComponent implements OnInit {



    public selectControl: FormControl
    public categoryList$: Observable<CategoryModel[]>; // List of all categories
    public lastLoadedProduct$: Observable<string> | null; // Id of the last category is loaded  
    public permissionToAppearHtml = false;


    constructor(private productService: ProductsService,
        private categoryService: CategoryService,
        private formBuilder: FormBuilder,
    ) { }


    ngOnInit(): void {
       
        this.categoryService.loadCategory().then(x => {
            this.selectControl = this.formBuilder.control(x[0]._id)
            this.loadProducts(x[0]._id)
            this.permissionToAppearHtml=!this.permissionToAppearHtml
        })
        this.categoryList$ = this.categoryService.categoryList$

    }

    loadProducts(categoryIdz: string) {
        // this.navigateService.navigateByUrlTree(categoryIdz)
        this.productService.loadProductsByCategoryId(categoryIdz)
        
    }

}
