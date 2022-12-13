import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/material/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from './components/material/card/card.component'
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { DropdownBoxComponent } from './components/material/forms/dropdown-box/dropdown-box.component';
import { DialogAnimationsComponent } from './components/material/dialog/dialog-animations/dialog-animations.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTreeModule} from '@angular/material/tree';
import { CartComponent } from './components/cart/cart.component';
import { EditCardComponent } from './components/edit-card/edit-card.component';
import {MatButtonModule} from '@angular/material/button';
import { AddCardComponent } from './components/add-card/add-card.component';
import { AdminSelectorSidnavComponent } from './components/admin-selector-sidnav/admin-selector-sidnav.component';

@NgModule({
    declarations: [

        SidenavComponent,
        CardComponent,
        DropdownBoxComponent,
        DialogAnimationsComponent,
        CartComponent,
        EditCardComponent,
        AddCardComponent,
        AdminSelectorSidnavComponent,
        
    ],
    exports: [SidenavComponent, CardComponent,EditCardComponent],

    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatRadioModule,
        MatSelectModule,
        MatDialogModule,
        MatInputModule,
        MatTreeModule,
        MatButtonModule
         

    ]
})
export class SharedModule { }
