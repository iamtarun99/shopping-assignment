import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { HomeService } from './home.service';
import { cold } from 'jasmine-marbles';
import { Banners } from '../modules/home/models/Banners';
import { Category } from 'src/app/models/Category';

describe('HomeService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;
  const banners: Banners[] = [
    {
      bannerImageUrl: "/static/images/offers/offer1.jpg",
      bannerImageAlt: "Independence Day Deal - 25% off on shampoo",
      isActive: true,
      order: 1,
      id: "5b6c38156cb7d770b7010ccc"
    }
  ];
  const category: Category[] = [{
    name: "Beverages",
    key: "beverages",
    description: "Our beverage department will ensure your fridge is always fully stocked. Shop for soda, juice, beer and more. ",
    enabled: true,
    order: 3,
    imageUrl: "/static/images/category/beverages.png",
    id: "5b675e5e5936635728f9fc30"
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should set category id', () => {
    const cat$ = cold('a',{a: '2'});
    service.setCategoryId('2');
    expect(service.categoryId$).toBeObservable(cat$);
  });
  it('should get banners', () => {
    service.getBanners().subscribe(res => {
      expect(res).toEqual(banners);
    });
    const  req = httpMock.expectOne(`${environment.apiUrl}/banners`);
    expect(req.request.method).toBe("GET");
    req.flush(banners);
    httpMock.verify();
  });
  it('should get categories', () => {
    service.getCategories().subscribe(res => {
      expect(res).toEqual(category);
    });
    const  req = httpMock.expectOne(`${environment.apiUrl}/categories`);
    expect(req.request.method).toBe("GET");
    req.flush(category);
    httpMock.verify();
  });
});
