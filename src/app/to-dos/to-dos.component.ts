import { Component, OnInit } from '@angular/core';
import { ToDo } from '../to-do';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.css']
})
export class ToDosComponent implements OnInit {

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

  ngOnInit(): void { //get data on component init
    this.getToDos();
  }

}
