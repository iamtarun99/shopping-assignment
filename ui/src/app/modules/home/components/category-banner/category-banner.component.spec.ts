import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { CategoryBannerComponent } from './category-banner.component';

describe('CategoryBannerComponent', () => {
  let component: CategoryBannerComponent;
  let fixture: ComponentFixture<CategoryBannerComponent>;
  let router: Router;
  let mockHome = {
    setCategoryId: jasmine.createSpy('setCategoryId')
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]),],
      providers: [ { provide: HomeService, useValue: mockHome} ],
      declarations: [ CategoryBannerComponent ]
    })
    .overrideTemplate(CategoryBannerComponent,'')
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBannerComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show products of selected category', () => {
    const spy = spyOn(router, 'navigate');
    component.onExploreClick('2');
    expect(spy).toHaveBeenCalledWith(['/products']);
    expect(mockHome.setCategoryId).toHaveBeenCalledWith('2');
  });
});
