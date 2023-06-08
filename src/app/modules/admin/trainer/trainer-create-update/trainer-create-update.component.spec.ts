import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerCreateUpdateComponent } from './trainer-create-update.component';

describe('TrainerCreateUpdateComponent', () => {
  let component: TrainerCreateUpdateComponent;
  let fixture: ComponentFixture<TrainerCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
