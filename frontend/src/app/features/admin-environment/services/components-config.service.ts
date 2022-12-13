import { Injectable } from '@angular/core';
import { AdminSelectorSidnavComponent } from 'src/app/shared/components/admin-selector-sidnav/admin-selector-sidnav.component';

@Injectable({
    providedIn: 'root'
})
export class ComponentsConfigService {

    
    public sidenavConfig() {
        const sidenavComponentConfig =
        {
            sidenav: {
                // component: () => import('src/app/shared/components/edit-card/edit-card.component').then(it => it.EditCardComponent),
                // varSelector:'SidenavArea',
                component: () => import('src/app/shared/components/admin-selector-sidnav/admin-selector-sidnav.component').then(it => it.AdminSelectorSidnavComponent),
                varSelector:'SidenavArea',
            // inputs: {
            //     name: 'name lior'
            // }
        },
            content: {
                component: () => import('../components/router-outlet/router-outlet.component').then(it => it.RouterOutletComponent),
                varSelector:'ContentSidenav',

            }
        }
        return sidenavComponentConfig
    }

    constructor() { }
}
