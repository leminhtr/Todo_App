import { Injectable } from '@angular/core';

import {ToDo} from './to-do';
import {TODOS} from './mock-todo';

@Injectable()
export class ToDoService {

  getToDos(): Promise<ToDo[]> {
    return Promise.resolve(TODOS);
  }


  constructor() { }

}
