import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { LoginService } from 'src/app/services/login.service';
import { of } from 'rxjs';

describe('HomePageComponent User', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let mockHome = {
    getBanners: function(){ return of()},
    getCategories: function(){ return of()}
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: '', component: HomeComponent}
      ])],
      declarations: [ HomeComponent ],
      providers: [{ provide: HomeService, useValue: mockHome}, { provide: LoginService, useValue:{isLoggedIn: true} }]
    })
    .overrideTemplate(HomeComponent,'')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to login', () => {
      component.loginService.isLoggedIn = false;
      const spy = spyOn(router, 'navigate');
      fixture.detectChanges();
      component.ngOnInit();
      expect(spy).toHaveBeenCalledOnceWith(['login'])
    });
});