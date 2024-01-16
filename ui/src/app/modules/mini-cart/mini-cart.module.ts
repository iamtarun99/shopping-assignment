import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MiniCartPageComponent } from './mini-cart-page/mini-cart-page.component';

const routes: Routes = [
  {
    path: '',
    component: MiniCartPageComponent, pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    MiniCartPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [MiniCartPageComponent]
})
export class MiniCartModule { }
