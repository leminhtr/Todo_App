import { TestBed, inject } from '@angular/core/testing';

import { ToDoService } from './to-do.service';
import {RouterModule} from '@angular/router';

import {ToDo} from './to-do';
// import {TODOS} from './mock-todo';
import {Http, Headers, HttpModule} from '@angular/http';
import {ListToDo} from './list-toDo';
import {toPromise} from 'rxjs/operator/toPromise';


describe('ToDoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToDoService],
      imports: [HttpModule]
      // declarations: [RouterModule]
    });
  });

  it('should be created', inject([ToDoService], (service: ToDoService) => {
    expect(service).toBeTruthy();
  }));
});
