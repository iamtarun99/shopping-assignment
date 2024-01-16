import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  constructor(private cartService: CartService) { }
  @Input() product: Product;
  
  ngOnInit(): void {
  }
  addItemToCart(id: string) {
    this.cartService.addItemToCart(id, this.product);
  }
}
