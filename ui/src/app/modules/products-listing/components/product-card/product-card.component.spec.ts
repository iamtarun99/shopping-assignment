import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { CartService } from 'src/app/services/cart.service';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let cartMock = {
    addItemToCart: jasmine.createSpy('addItemToCart')
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ],
      providers: [
        { provide: CartService, useValue: cartMock }
      ],
    })
    .overrideTemplate(ProductCardComponent,'')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add item to cart', () => {
    component.addItemToCart('1');
    expect(cartMock.addItemToCart).toHaveBeenCalledOnceWith('1',undefined);
  });
});
