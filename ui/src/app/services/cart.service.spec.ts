import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { cold } from 'jasmine-marbles';

describe('CartService', () => {
  let service: CartService;
  const mockItem = {
    name: "Listerine Mouthwash - Cool Mint, 250 ml",
    imageURL: "/static/images/products/beauty-hygiene/listerine.jpg",
    description: "Listerine Cool mint Antibacterial Mouthwash is rapid & easy to use, a 30 second \"slosh\" with Listerine after brushing and flossing reaches parts of the mouth that may be missed. Used two times daily, Listerine provides 24-hour defence against plaque and lasting bright breath assurance.",
    price: 109,
    stock: 50,
    category: "5b68994e3d1a866534f516df",
    sku: "bh-listerine-250",
    id: "a1"
  };
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('show cart', () => {
    const showCart$ = cold('a',{ a: true });
    service.show();
    expect(service.showCart).toBeObservable(showCart$);
  });
  it('hide cart', () => {
    const showCart$ = cold('a',{ a: false });
    service.hide();
    expect(service.showCart).toBeObservable(showCart$);
  });

  it('should Add item to cart', () => {
    const cartItem$ = cold('a',{ a: Array.of({count:1, product:mockItem}) });
    service.addItemToCart('a1', mockItem);
    expect(service.getCartItem).toBeObservable(cartItem$);
  });
  it('should Remove item from cart - reduce number of item', () => {
    const cartItem$ = cold('a',{ a: Array.of({count:1, product:mockItem}) });
    service.addItemToCart('a1', mockItem);
    service.addItemToCart('a1', mockItem);
    service.removeItemToCart('a1',1)
    expect(service.getCartItem).toBeObservable(cartItem$);
  });
  it('should Remove item from cart - empty the cart', () => {
    const cartItem$ = cold('a',{ a: [] });
    service.addItemToCart('a1', mockItem);
    service.removeItemToCart('a1',1)
    expect(service.getCartItem).toBeObservable(cartItem$);
  });
  it('should Remove item from cart - cart already empty', () => {
    const cartItem$ = cold('a',{ a: [] });
    service.removeItemToCart('a1',1)
    expect(service.getCartItem).toBeObservable(cartItem$);
  });
});
