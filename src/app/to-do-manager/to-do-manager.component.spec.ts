import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoManagerComponent } from './to-do-manager.component';

describe('ToDoManagerComponent', () => {
  let component: ToDoManagerComponent;
  let fixture: ComponentFixture<ToDoManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
