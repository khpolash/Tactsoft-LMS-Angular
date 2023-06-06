import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCreatUpdateComponent } from './country-create-update.component';

describe('CountryCreatUpdateComponent', () => {
  let component: CountryCreatUpdateComponent;
  let fixture: ComponentFixture<CountryCreatUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCreatUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryCreatUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
