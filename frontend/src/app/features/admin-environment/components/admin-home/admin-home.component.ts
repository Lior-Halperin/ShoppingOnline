import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { CategoryService } from 'src/app/core/category.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { SidenavComponent } from 'src/app/shared/components/material/sidenav/sidenav.component';
import { ComponentsConfigService } from '../../services/components-config.service';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    // styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent implements OnInit, AfterViewInit {


    @ViewChild('toSidenav') childMainSidenav: SidenavComponent;

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

    }

}
