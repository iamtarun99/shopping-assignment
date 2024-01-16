import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from 'src/app/services/login.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';

describe('LoginPageComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mocklogin = {
    checkLoginCred: jasmine.createSpy('checkLoginCred').and.returnValue(true),
    isLoggedIn$: of(false,true),
  };
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{path: '', component: LoginComponent}, {path: 'home', component: LoginComponent}])],
      providers: [{provide: LoginService, useValue: mocklogin}],
      declarations: [ LoginComponent ]
    })
    .overrideTemplate(LoginComponent, '')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should login successully', () => {
    mocklogin.checkLoginCred.and.returnValue(true);
    const spy = spyOn(router, 'navigate');
    let loginData: NgForm = <NgForm>{
      value: {
        email: '',
        password: ''
      }
    }
    component.submitLogin(loginData);
    expect(spy).toHaveBeenCalledWith(['/home']);
  });
  it('should show login failure', () => {
    const spy = spyOn(router, 'navigate');
    let loginData: NgForm = <NgForm>{
      value: {
        email: '',
        password: ''
      }
    }
    mocklogin.checkLoginCred.and.returnValue(false);
    component.submitLogin(loginData);
    expect(spy).not.toHaveBeenCalled();
  });
});
