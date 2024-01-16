import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartProduct } from '../models/CartProduct';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  addToCartUrl: string = `${environment.apiUrl}/addToCart`;
  productsUrl: string = `${environment.apiUrl}/products`;

  productsInCart: CartProduct[] = [];

  private cartItems: BehaviorSubject<CartProduct[]> = new BehaviorSubject<CartProduct[]>([]);
  getCartItem: Observable<CartProduct[]> = this.cartItems.asObservable();

  private showCartSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showCart: Observable<boolean> = this.showCartSub.asObservable();
  constructor() {
  }
  show() {
    this.showCartSub.next(true);
  }

  hide() {
    this.showCartSub.next(false);
  }
  removeItemToCart(id: string, count: number = 1) {
    const productAlreadypresent: number = this.productsInCart.findIndex( x => x.product.id === id );
    if (productAlreadypresent > -1) {
      this.productsInCart[productAlreadypresent].count -= count;
      if (this.productsInCart[productAlreadypresent].count === 0) {
        this.productsInCart.splice(productAlreadypresent, 1);
      }
      this.cartItems.next(this.productsInCart);
    }
  }
  addItemToCart(id: string, currProduct: Product) {
    const productAlreadypresent: number = this.productsInCart.findIndex( x => x.product.id === id );
    if (productAlreadypresent > -1) {
      this.productsInCart[productAlreadypresent].count += 1;
      this.cartItems.next(this.productsInCart);
    } else {
      const newprod: CartProduct = { product: currProduct, count: 1 };
      this.productsInCart.push(newprod);
      this.cartItems.next(this.productsInCart);
    }
  }
}
