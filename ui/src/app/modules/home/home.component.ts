import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Banners } from './models/Banners';
import { Category } from 'src/app/models/Category';
import { HomeService } from 'src/app/services/home.service';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private router: Router, public loginService: LoginService) { }
  bannerData$: Observable<Banners[]>;
  categoriesData$: Observable<Category[]>;

  ngOnInit(): void {
      if (this.loginService.isLoggedIn) {
        this.getData();
      }
      else {
        this.router.navigate(['login']);
      }
  }

  getData() {
    this.bannerData$ = this.homeService.getBanners();
    this.categoriesData$ = this.homeService.getCategories();
  }
}
