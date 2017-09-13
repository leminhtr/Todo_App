import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDetailUpdateComponent } from './todo-detail-update.component';

describe('TodoDetailUpdateComponent', () => {
  let component: TodoDetailUpdateComponent;
  let fixture: ComponentFixture<TodoDetailUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoDetailUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
