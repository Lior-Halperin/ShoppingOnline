import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

    products$: Observable<ProductModel[]>;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.products$ = this.productService.products$;

  }


}
