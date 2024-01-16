import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Banners } from '../modules/home/models/Banners';
import { Category } from '../models/Category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  private categoryIdSub$ = new BehaviorSubject<string | null>(null);
  bannerUrl: string = `${environment.apiUrl}/banners`;
  categoriesUrl: string = `${environment.apiUrl}/categories`;
  categoryId$: Observable<string | null> = this.categoryIdSub$.asObservable();

  constructor(private httpClient: HttpClient) { }
  
  setCategoryId(value: string) {
    this.categoryIdSub$.next(value);
  }
  getBanners(): Observable<Banners[]> {
    return this.httpClient.get<Banners[]>(this.bannerUrl)
      .pipe(response => response);
  }
  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoriesUrl)
      .pipe(response => response);
  }
}
