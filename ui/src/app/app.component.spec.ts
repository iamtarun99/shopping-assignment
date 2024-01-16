import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { CartService } from './services/cart.service';

describe('AppComponent', () => {
  let component : AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const mockService = {
    showCart: of(true)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{provide: CartService, useValue: mockService}]
    })
    .overrideTemplate(AppComponent,'')
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should show cart`, () => {
    component.showCart$.subscribe(res => {
      expect(res).toEqual(true);
    });
  });
});
