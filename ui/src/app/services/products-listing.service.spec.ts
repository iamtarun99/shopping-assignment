import { TestBed } from '@angular/core/testing';
import { ProductsListingService } from './products-listing.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Category } from 'src/app/models/Category';
import { environment } from 'src/environments/environment';

describe('Product listing service', () => {
  let service: ProductsListingService;
  let httpMock: HttpTestingController;
  const category: Category[] = [{
    name: "Beverages",
    key: "beverages",
    description: "Our beverage department will ensure your fridge is always fully stocked. Shop for soda, juice, beer and more. ",
    enabled: true,
    order: 3,
    imageUrl: "/static/images/category/beverages.png",
    id: "5b675e5e5936635728f9fc30"
  }];
  const products = [
    {
      name: "Coca Cola Soft Drink, 2x1.75 L",
      imageURL: "/static/images/products/beverages/bournvita.jpg",
      description: "Cadbury Bournvita is a delicious chocolate health drink which is enriched with Vitamin (D,B2,B9,B12). It combines the great taste of chocolate, and goodness of essential nutrients that aid growth and development.",
      price: 150,
      stock: 50,
      category: "5b675e5e5936635728f9fc30",
      sku: "coke-175",
      id: "5b6c6fed01a7c3842953088f"
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductsListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get products', () => {
    service.getProducts().subscribe(res => {
      expect(res).toEqual(products);
    });
    const  req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe("GET");
    req.flush(products);
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

