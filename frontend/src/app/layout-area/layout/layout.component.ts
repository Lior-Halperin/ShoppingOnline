import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { CartService } from 'src/app/core/cart.service';
import Role from 'src/app/models/role-enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {

    this.authService.initialOperation()
    this.cartService.loadCartFromStorage()
  }
  

}
