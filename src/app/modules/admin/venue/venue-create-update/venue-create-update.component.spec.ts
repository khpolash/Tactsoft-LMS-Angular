import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueCreateUpdateComponent } from './venue-create-update.component';

describe('VenueCreateUpdateComponent', () => {
  let component: VenueCreateUpdateComponent;
  let fixture: ComponentFixture<VenueCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenueCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
