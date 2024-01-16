import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryBannerComponent } from './components/category-banner/category-banner.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    HomeComponent,
    CarouselComponent,
    CategoryBannerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule
  ]
})
export class HomeModule { }
