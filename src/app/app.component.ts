import { Component, OnInit } from '@angular/core';

import { ToDo } from './to-do';
import { ToDoService } from './to-do.service';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToDoService]
})
export class AppComponent implements OnInit{
  title = 'To Do App';
  todos: ToDo[];
  selectedToDo: ToDo;

  constructor(private todoService: ToDoService) { }

  onSelect(todo: ToDo): void {
    this.selectedToDo = todo;
  }
  getToDos(): void {  //get data from ToDo service, using its method
    // sets the component's heroes property to the array of heroes returned by the service.
    this.todoService.getToDos().then(todos => this.todos = todos);
  }

  ngOnInit(): void{ //get data on component init
    this.getToDos();
  }

}




