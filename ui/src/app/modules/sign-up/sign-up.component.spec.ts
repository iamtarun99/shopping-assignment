import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from 'src/app/services/login.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { SignUpPageComponent } from './sign-up.component';
import { NgForm } from '@angular/forms';

describe('SignUpPageComponent', () => {
  let component: SignUpPageComponent;
  let fixture: ComponentFixture<SignUpPageComponent>;
  let mocklogin = {
    saveRegistrationData: jasmine.createSpy('saveRegistrationData')
  };
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        {path: '', component: SignUpPageComponent},
        {path: '**', pathMatch: 'prefix', redirectTo: ''}
      ])],
      providers: [{provide: LoginService, useValue: mocklogin} ],
      declarations: [ SignUpPageComponent ]
    })
    .overrideTemplate(SignUpPageComponent, '')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should register successfully', () => {
    const signUpData = <NgForm>{
      value: {
        email: '',
        password: '',
        fName: '',
        lname: ''
      }
    }
    component.submitForm(signUpData);
    expect(component).toBeTruthy();
  });
});
