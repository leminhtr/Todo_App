import { Component, OnInit } from '@angular/core';
import { ToDo } from '../to-do';
import { ToDoService } from '../to-do.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.css'],
  providers: [ToDoService]
})
export class ToDosComponent implements OnInit {
  todos: ToDo[];
  selectedToDo: ToDo;

  constructor(
    private router: Router,
    private todoService: ToDoService) { }

  onSelect(todo: ToDo): void {
    this.selectedToDo = todo;
  }
  getToDos(): void {  // get data from ToDo service, using its method
    // sets the component's heroes property to the array of heroes returned by the service.
    this.todoService.getToDos().then(todos => this.todos = todos);
  }

  ngOnInit(): void { // get data on component init
    this.getToDos();
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedToDo.id]);
  }

  add(task: string): void {
    task = task.trim();
    if (!task) { return; }
    this.todoService.create(task)
      .then(todo => {
        this.todos.push(todo);
        this.selectedToDo = null;
      });
  }

  delete(todo: ToDo): void {
    this.todoService
      .delete(todo.id)
      .then(() => {
        this.todos = this.todos.filter(t => t !== todo);
        if (this.selectedToDo === todo) { this.selectedToDo = null; }
      });
  }

  edit(task: string): void {
    this.selectedToDo.task = task;
  }
  // edit(todo: ToDo): void {
  //   this.todoService.update();
  // }
}
