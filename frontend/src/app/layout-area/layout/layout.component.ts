import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { CartService } from 'src/app/core/cart.service';

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
