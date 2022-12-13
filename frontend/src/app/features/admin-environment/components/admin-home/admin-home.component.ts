import { AfterViewInit, Component, ContentChild, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { CategoryService } from 'src/app/core/category.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductModel } from 'src/app/models/product.model';
import { CardComponent } from 'src/app/shared/components/material/card/card.component';
import { DropdownBoxComponent } from 'src/app/shared/components/material/forms/dropdown-box/dropdown-box.component';
import { SidenavComponent } from 'src/app/shared/components/material/sidenav/sidenav.component';
import { ComponentsConfigService } from '../../services/components-config.service';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit, AfterViewInit {

    // @ViewChild("mor") morRef: ElementRef<HTMLInputElement>

    @ViewChild('toSidenav') childMainSidenav: SidenavComponent;
    // @ViewChild('sidenav') dropdownBoxComponent: DropdownBoxComponent;

    // @ViewChild('adminRouter', {read: ViewContainerRef})adminRouter! : ViewContainerRef;

    public counter$: Observable<number>;

    constructor(private productsService: ProductsService, private componentsConfigService: ComponentsConfigService, private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.counter$ = this.productsService.products$.pipe(map(list => list.length), distinctUntilChanged());
        this.productsService.products$.pipe(map(list => list.length), distinctUntilChanged());

    }

    createComponentBasedOnConfig() {
        const SidenavComponentConfig = this.componentsConfigService.sidenavConfig();
        Object.entries(SidenavComponentConfig).forEach(async ([key, value]) => {

            const componentInstance = await value.component()

            switch (value.varSelector) {
                case value.varSelector = 'SidenavArea':
                    this.childMainSidenav.SidenavArea.createComponent(componentInstance);
                    break;
                case value.varSelector = 'ContentSidenav':
                    this.childMainSidenav.ContentSidenav.createComponent(componentInstance);
                    break;
            }
        })

    }


    ngAfterViewInit(): void {
        this.createComponentBasedOnConfig()

        // this.dropdownBoxComponent.selectControl.setValue('62e2a895d599b19de53ffbcb')
    }

    // send() {
    //     console.log(this.morRef.nativeElement)
    //     console.log(this.morRef)
    // }
    //     async importRouter() {
    //     const componentConfig = { lior :() => import('../products-area/products-list/products-list.component').then(card => card.ProductsListComponent)};
    //     const componentInstance = await componentConfig.lior()
    //     const componentRef =  this.sidenav.mainSidenavMain.createComponent(componentInstance);
    //     //   Object.entries(componentConfig.inputs).forEach(([key,value]) => {
    //     //     componentRef.setInput(key , value)
    //     //   })
    //     // componentRef.setInput("name","dfs")
    // }

}
