import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import {AuthGuard} from './guards/auth.guard'
const routes: Routes = [

    {path:'login', component: LoginComponent},
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'admin',canActivate:[AuthGuard], loadChildren: () => import('./features/admin-environment/admin-environment.module').then(o => o.AdminEnvironmentModule)},
    {path:'client',canActivate:[AuthGuard], loadChildren: () => import('./features/client-environment/client-environment.module').then(o => o.ClientEnvironmentModule)},
    {path: "**", component:PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
