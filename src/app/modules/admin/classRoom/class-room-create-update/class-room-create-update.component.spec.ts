import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRoomCreateUpdateComponent } from './class-room-create-update.component';

describe('ClassRoomCreateUpdateComponent', () => {
  let component: ClassRoomCreateUpdateComponent;
  let fixture: ComponentFixture<ClassRoomCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassRoomCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassRoomCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
