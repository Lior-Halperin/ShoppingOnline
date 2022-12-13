import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminEnvironmentRoutingModule } from './admin-environment-routing.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RouterOutletComponent } from './components/router-outlet/router-outlet.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    ProductsListComponent,
    RouterOutletComponent,
  ],
  imports: [
    CommonModule,
    AdminEnvironmentRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    
  ]
})
export class AdminEnvironmentModule { }
