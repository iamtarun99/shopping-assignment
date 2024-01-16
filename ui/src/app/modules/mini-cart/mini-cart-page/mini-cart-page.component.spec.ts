import { CartService } from 'src/app/services/cart.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCartPageComponent } from './mini-cart-page.component';
import { of } from 'rxjs';

describe('MiniCartPageComponent', () => {
  let component: MiniCartPageComponent;
  let fixture: ComponentFixture<MiniCartPageComponent>;
  let cartMock = {
    addItemToCart: jasmine.createSpy('addItemToCart'),
    removeItemToCart: jasmine.createSpy('removeItemToCart'),
    hide: jasmine.createSpy('hide'),
    getCartItem: of([{
      count: 1,
      product: {
        name: "test",
        imageURL: "test",
        description: "test",
        price: 1,
        stock: 1,
        category: "test",
        sku: "test",
        id: "test"}
    },
    {
      count: 0,
      product: {
        name: "test",
        imageURL: "test",
        description: "test",
        price: 0,
        stock: 1,
        category: "test",
        sku: "test",
        id: "test"}
    }])
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniCartPageComponent ],
      providers: [
        { provide: CartService, useValue: cartMock }
      ],
    })
    .overrideTemplate(MiniCartPageComponent,'')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should close cart', () => {
    component.onClose();
    expect(cartMock.hide).toHaveBeenCalledTimes(1);
  });
  it('should add item', () => {
    const mockItem = {
      name: "Listerine Mouthwash - Cool Mint, 250 ml",
      imageURL: "/static/images/products/beauty-hygiene/listerine.jpg",
      description: "Listerine Cool mint Antibacterial Mouthwash is rapid",
      price: 109,
      stock: 50,
      category: "5b68994e3d1a866534f516df",
      sku: "bh-listerine-250",
      id: "a1"
    };
    component.addItemToCart('1',mockItem);
    expect(cartMock.addItemToCart).toHaveBeenCalledWith('1',mockItem);
  });
  it('should remove item', () => {
    component.removeItemToCart('1',1);
    expect(cartMock.removeItemToCart).toHaveBeenCalledWith('1',1)
  });
});
