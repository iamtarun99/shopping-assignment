import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public showCart$: Observable<boolean>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.showCart$ = this.cartService.showCart;
  }
}
