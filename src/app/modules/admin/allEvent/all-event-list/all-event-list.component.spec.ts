import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEventListComponent } from './all-event-list.component';

describe('AllEventListComponent', () => {
  let component: AllEventListComponent;
  let fixture: ComponentFixture<AllEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEventListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
