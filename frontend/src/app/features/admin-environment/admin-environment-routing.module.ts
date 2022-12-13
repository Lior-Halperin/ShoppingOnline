import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';

const routes: Routes = [
    {
        // path:'', component:AdminHomeComponent, children: [
        //     {path:'products', component:ProductsListComponent},
        //     // {path:'products/category/:id', component:ProductsListComponent},
        //     {path:'details', component:ProductsDetailsComponent}
        // ]
        path:'', component:AdminHomeComponent, children: [
            {path:'products', component:ProductsListComponent},
            // {path:'products/category/:id', component:ProductsListComponent},
            {path:'', redirectTo:'products', pathMatch:'full'},
            {path: "**", component:PageNotFoundComponent}
  
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEnvironmentRoutingModule { }
