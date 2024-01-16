import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListingComponent } from './products-listing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductsListingService } from 'src/app/services/products-listing.service';
import { of } from 'rxjs';

describe('ProductsListingPageComponent', () => {
  let component: ProductsListingComponent;
  let fixture: ComponentFixture<ProductsListingComponent>;
  let router: Router;
  let productMock = {
    getCategories: jasmine.createSpy('getCategories').and.returnValue(of()),
    getProducts: jasmine.createSpy('getProducts').and.returnValue(of()),
  }
  let homeMock = {
    categoryId$: of('1'),
  }
  let loginMock = {
    isLoggedIn: true
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: ProductsListingService, useValue: productMock },
        { provide: LoginService, useValue: loginMock },
        { provide: HomeService, useValue: homeMock }
      ],
      declarations: [ ProductsListingComponent ]
    })
    .overrideTemplate(ProductsListingComponent,'')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListingComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should change selection', () => {
    component.onSelectionChange('2');
    expect(component.currCategory).toEqual('2');
  });
  it('should not be logged in', () => {
    loginMock.isLoggedIn = false;
    const spy = spyOn(router, 'navigate');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(['login']);
  });
});
