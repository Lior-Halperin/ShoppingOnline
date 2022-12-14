import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/auth/login/login.component';
import { CoreModule } from './core/core.module';
import { LayoutComponent } from './layout-area/layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './layout-area/header/header.component';
import { SinginComponent } from './components/auth/singin/singin.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [ // Module components
        LoginComponent,
        LayoutComponent,
        HeaderComponent,
        SinginComponent,
    ],
    imports: [ // Which other Modules we need to know so we could use their components and other commands
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatStepperModule,
        MatSelectModule
        
    ],
    exports: [ // Which components we want to export outside of this module, so any other module could use it
    ],
    // providers: [ColorsService], // Create ColorsService object for the entire app
    providers: [],
    bootstrap: [LayoutComponent] // Initial component placed inside index.html
})
export class AppModule { }
