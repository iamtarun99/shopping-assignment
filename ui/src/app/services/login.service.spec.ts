import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { cold } from 'jasmine-marbles';

describe('Login service', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;
  const user ={
    email: 'abc@gmail.com',
    password: '123'
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LoginService);
  });
  afterEach(()=>{
    localStorage.clear();
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should successfully login', () => {
    service.isLoggedIn = true;
    expect(service.isLoggedIn$).toBeObservable(cold('a',{a: true}));
    expect(service.isLoggedIn).toBeTrue();
  });
  it('should check incorrect login credentials', () => {
    expect(service.checkLoginCred({email:'',password:''})).toBeFalse();
  });
  it('should check valid login credentials', () => {
    service.saveRegistrationData(user);
    expect(service.checkLoginCred(user)).toBeTrue();
  });
  it('should register successfully when user database is empty', () => {
    service.saveRegistrationData(user);
    expect(service.userList).toEqual(Array.of(user));
    expect(service.isLoggedIn).toBeTrue();
  });
  it('should register successfully when user database has existing users', () => {
    localStorage.setItem('userDetails','[]');
    service.saveRegistrationData(user);
    expect(service.userList).toEqual(Array.of(user));
    expect(service.isLoggedIn).toBeTrue();
  });
});
