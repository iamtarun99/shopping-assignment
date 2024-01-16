import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { HeaderComponent } from './header.component';
import { from, of, Subject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let mockCart = {
    getCartItem: of([1,2,3]),
    show: jasmine.createSpy('show').and.stub()
  }
  let mocklogin = {
    isLoggedIn$: of(true),
    isLoggedIn: true
  }
  let spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]),],
      providers: [{provide: CartService, useValue: mockCart},{provide: LoginService, useValue: mocklogin} ],
      declarations: [ HeaderComponent ]
    })
    .overrideTemplate(HeaderComponent, '')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spy = spyOn(router, 'navigate');
    const events = [new NavigationEnd(1,'login',''),new NavigationEnd(1,'home',''),new NavigationEnd(1,'product','')];
    spyOn(router.events, 'pipe').and.returnValue(from(events));
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to login', () => {
    component.logIn();
    expect(spy).toHaveBeenCalledWith(['/login']);
  });
  it('should logout and navigate to login', () => {
    component.logOut();
    expect(spy).toHaveBeenCalledWith(['/login']);
  });
  it('should navigate to signup', () => {
    component.register();
    expect(spy).toHaveBeenCalledWith(['/signup']);
  });
  it('should open cart', () => {
    component.onClickCart();
    expect(mockCart.show).toHaveBeenCalled();
  });
});
