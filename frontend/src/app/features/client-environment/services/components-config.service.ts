import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ComponentsConfigService {

    public sidenavConfig() {
        const sidenavComponentConfig =
        {
            sidenav: {
                component: () => import('src/app/shared/components/cart/cart.component').then(it => it.CartComponent),
                varSelector:'SidenavArea',
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
