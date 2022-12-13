import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from './auth-interceptor.service';
import { ClosPageDirective } from '../shared/directives/clos-page.directive';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ClosPageDirective,
  ],
  imports: [
    CommonModule,
    HttpClientModule, 
    MatSnackBarModule
       
  ],
  providers:[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptorService,
        multi:true
    }
  ],
  exports: [ // Which components we want to export outside of this module, so any other module could use it
  ClosPageDirective,
],
})
export class CoreModule { }
