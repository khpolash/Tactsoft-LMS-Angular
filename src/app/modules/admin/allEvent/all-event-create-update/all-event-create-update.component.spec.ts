import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEventCreateUpdateComponent } from './all-event-create-update.component';

describe('AllEventCreateUpdateComponent', () => {
  let component: AllEventCreateUpdateComponent;
  let fixture: ComponentFixture<AllEventCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEventCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEventCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
