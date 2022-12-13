import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/category.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { CategoryModel } from 'src/app/models/category.model';
import { combineLatest, filter, firstValueFrom, map, Observable, tap } from 'rxjs';
import { NavigateService } from 'src/app/core/navigate.service';

@Component({
    selector: 'app-dropdown-box',
    templateUrl: './dropdown-box.component.html',
    styleUrls: ['./dropdown-box.component.css']
})
export class DropdownBoxComponent implements OnInit {

    // colorControl = new FormControl('primary');
    // // fontSizeControl = new FormControl(16, Validators.min(10));
    // options = this.formBuilder.group({
    //     color: this.colorControl,
    //     // fontSize: this.fontSizeControl,
    // });

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




        // this.categoryService.loadCategory()

        // this.categoryList$ = this.categoryService.categoryList$

        //    this.categoryService.categoryList$.pipe(filter(iCategory=>iCategory.length===0)).subscribe(
        //     ()=>this.categoryService.loadCategory()
        //     .then(x=>{
        //         this.selectControl = this.formBuilder.control(`${x[0]._id}`)


        //     }))

        //     this.categoryService.categoryList$.subscribe(iCategoryLength => {
        //         if(iCategoryLength.length===0){
        //             console.log(iCategoryLength)
        //             this.categoryService.loadCategory().then( x=>{
        //                 console.log(`${x[0]._id}`)
        //             this.selectControl = this.formBuilder.control(`${x[0]._id}`)})
        //         }
        //         else{
        //             // this.selectControl = this.formBuilder.control('CategoryService`)

        //         }
        //     }
        // )
        // this.selectControl = this.formBuilder.control(`${this.firstLoadedCategory$.pipe(filter(x=>x!==null)).subscribe()}`)


        // firstValueFrom(this.categoryList$.pipe(map(iCategory=>iCategory)))
        // .then( iCategoryLength => {
        //     const t = this.categoryService.loadCategory()

        //     console.log()
        //     // if(iCategoryLength===0){
        //     //     this.categoryService.loadCategory()
        //     // }
        // })



        // this.selectControl = this.formBuilder.control('62e2a6cbd599b19de53ffbc7')

        // const defaultIdToFormBuilder = firstValueFrom(this.categoryList$.pipe(filter(iCategory=>iCategory.length>0))).then(X=>console.log(X[0]._id))
        // let defaultIdToFormBuilder:string = null;
        // firstValueFrom(this.categoryList$.pipe(filter(iCategory=>iCategory.length>0))).then(X=>defaultIdToFormBuilder=X[0]._id)

        // function reload(){

        // }
        // console.log('default',defaultIdToFormBuilder)
        // this.selectControl = this.formBuilder.control(`${defaultIdToFormBuilder}`)

        //---------------------------------------------------
        // ראה שיעור 35 מתאים לעגלה
        // combineLatest([
        //     this.lastLoadedProduct$,
        //     this.categoryList$
        // ]).subscribe(([lastLoaded,categoryList])=>{
        //     console.log('lastLoaded',lastLoaded);
        //     console.log('categoryList',categoryList)
        // });
        //---------------------------------------------------

        // this.lastLoadedProduct$.subscribe(categoryId => {
        //     if(!categoryId){
        //         const firstCategory = this.categoryService.loadCategory()
        //         console.log('iaaaa',firstCategory)
        //     }

        //     this.selectControl = this.formBuilder.control(categoryId)

        // })

        // this.lastLoadedProduct$.subscribe(categoryId => 
        //     {
        //             this.selectControl = this.formBuilder.control(categoryId)

        // })


        // this.selectControl.valueChanges.pipe().subscribe(categoryIdz => {
        //     console.log('categoryId----------', categoryIdz)

        //     this.productService.loadProductsByCategoryId(categoryIdz)

        // })




}
