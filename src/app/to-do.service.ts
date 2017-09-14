import { Injectable } from '@angular/core';

import {ToDo} from './to-do';
import {TODOS} from './mock-todo';

@Injectable()
export class ToDoService {

  getToDos(): Promise<ToDo[]> {
    return Promise.resolve(TODOS);
  }

  getToDo(id: number): Promise<ToDo> {
    return this.getToDos()
      .then(todos => todos.find(todo => todo.id === id));
  }
  constructor() { }

}
