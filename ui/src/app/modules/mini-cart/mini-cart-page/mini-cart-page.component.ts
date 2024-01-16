import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/CartProduct';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-mini-cart-page',
  templateUrl: './mini-cart-page.component.html',
  styleUrls: ['./mini-cart-page.component.scss']
})
export class MiniCartPageComponent implements OnInit {
  productsInCart: CartProduct[] = [];
  checkoutAmont: number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartItem.subscribe((data) => {
      this.productsInCart = data;
      this.checkoutAmont = this.productsInCart.reduce(
        (previousVal, currentVal) =>
          previousVal + (currentVal.product.price || 0) * (currentVal.count || 0),
        0
      );
    });
  }
  onClose() {
    this.cartService.hide();
  }
  removeItemToCart(productId: string, count: number) {
    this.cartService.removeItemToCart(productId, count);
  }
  addItemToCart(productId: string, product: Product) {
    this.cartService.addItemToCart(productId, product);
  }
}
