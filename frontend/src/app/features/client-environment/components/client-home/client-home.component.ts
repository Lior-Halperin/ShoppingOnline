import { AfterViewInit, Component, ContentChild, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CategoryService } from 'src/app/core/category.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { SidenavComponent } from 'src/app/shared/components/material/sidenav/sidenav.component';
import { ComponentsConfigService } from '../../services/components-config.service';
import { distinctUntilChanged, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {


    @ViewChild('toSidenav') childMainSidenav: SidenavComponent;


    public counter$: Observable<number>;

    constructor(private productsService: ProductsService, private componentsConfigService: ComponentsConfigService, 
        private categoryService: CategoryService) { }

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

    }

}
