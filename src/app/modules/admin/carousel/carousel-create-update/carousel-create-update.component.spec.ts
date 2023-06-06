import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselCreateUpdateComponent } from './carousel-create-update.component';

describe('CarouselCreateUpdateComponent', () => {
  let component: CarouselCreateUpdateComponent;
  let fixture: ComponentFixture<CarouselCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
