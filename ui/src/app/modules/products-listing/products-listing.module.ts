import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListingComponent } from './products-listing.component';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductListFilterPipe } from 'src/app/modules/products-listing/pipes/productsListFilter';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductsListingComponent, pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    ProductsListingComponent,
    ProductCardComponent,
    ProductListFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ProductsListingModule { }
