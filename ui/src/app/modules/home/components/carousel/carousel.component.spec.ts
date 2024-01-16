import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set mobile config', () => {
    component.isMobile = true;
    fixture.detectChanges();
    component.ngOnInit();
    let ev = { target: { innerWidth: 600 }}
    component.onResize(ev);
    expect(component).toBeTruthy();
  });
  it('should set desktop config', () => {
    let ev = { target: { innerWidth: 992 }}
    component.onResize(ev);
    expect(component).toBeTruthy();
  });
});
