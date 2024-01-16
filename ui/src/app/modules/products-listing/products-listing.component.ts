import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { HomeService } from 'src/app/services/home.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductsListingService } from 'src/app/services/products-listing.service';

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.scss']
})
export class ProductsListingComponent implements OnInit, OnDestroy {

  categoriesData$: Observable<Category[]>;
  productsList$: Observable<Product[]>;
  currCategory: string | null = null;
  subscription$: Subscription;
  constructor(private loginService: LoginService, private productSListingService: ProductsListingService,
    private router: Router, private homeService: HomeService) {
  }

  ngOnInit(): void {
      if (this.loginService.isLoggedIn) {
        this.subscription$ = this.homeService.categoryId$.subscribe((response) => {
          this.currCategory = response;
          this.getData();
        });
      }
      else {
        this.router.navigate(['login']);
      }
  }

  getData() {
    this.categoriesData$ = this.productSListingService.getCategories();
    this.productsList$ = this.productSListingService.getProducts();
  }
  
  onSelectionChange(categoryId: string | null) {
    this.currCategory = this.currCategory === categoryId ? null : categoryId;
  }
  ngOnDestroy(){
    this.subscription$ && this.subscription$.unsubscribe();
  }
}
