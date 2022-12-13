import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientEnvironmentRoutingModule } from './client-environment-routing.module';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { ClientHomeComponent } from './components/client-home/client-home.component';
import { ProductsHomeComponent } from './components/products-area/products-home/products-home.component';
import { RouterOutletComponent } from './components/router-outlet/router-outlet.component';


@NgModule({
  declarations: [
    ProductsListComponent,
    ClientHomeComponent,
    ProductsHomeComponent,
    RouterOutletComponent
  ],
  imports: [
    CommonModule,
    ClientEnvironmentRoutingModule,
    SharedModule
  ]
})
export class ClientEnvironmentModule { }
