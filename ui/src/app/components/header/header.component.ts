import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isModal: boolean = false;
  noOfItems: number = 0;
  isLoggedIn$: Observable<boolean>;
  activeId: number;
  subscription$: Subscription;

  constructor(private router: Router, private loginService: LoginService, private cartService: CartService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.loginService.isLoggedIn$;

    this.subscription$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((ev: NavigationEnd) => {
      if(ev.url.includes('home'))
      this.activeId = 1;
      else if(ev.url.includes('product'))
      this.activeId = 2;
      else
      this.activeId = 0;
    });

    this.cartService.getCartItem.subscribe((data) => {
      this.noOfItems = data.reduce(
        (previousVal, currentVal) => previousVal + (currentVal.count || 0),
        0
      );
    });
  }
  logOut() {
    this.loginService.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
  logIn() {
    this.router.navigate(['/login']);
  }
  register() {
    this.router.navigate(['/signup']);
  }

  onClickCart() {
    this.cartService.show();
  }
  ngOnDestroy(){
    this.subscription$.unsubscribe();
  }
}
