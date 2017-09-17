import {Component, Input, OnInit} from '@angular/core';
import { ToDo } from '../to-do';
import { ToDoService } from '../to-do.service';
import {Router} from '@angular/router';
import {ListToDo} from '../list-toDo';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.css'],
  providers: [ToDoService]
})
export class ToDosComponent implements OnInit {
  todos: ToDo[];
  selectedToDo: ToDo;

  @Input() listToDo: ListToDo;

  constructor(private router: Router,
              private todoService: ToDoService) {
  }

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

  // gotoDetail(): void {
  //   this.router.navigate(['/detail', this.selectedToDo.id]);
  // }

  add(task: string): void {
    task = task.trim();
    if (!task) {
      return;
    }
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
        if (this.selectedToDo === todo) {
          this.selectedToDo = null;
        }
      });
  }

  edit(task: string): void {
    this.selectedToDo.task = task;
  }


  printMsg(s: string) {
    console.log(s);
  }

  updateTask(todo: ToDo): void {
    if (todo.IsCompleted === false) {
      todo.IsCompleted = true;
      // else
      todo.IsCompleted = false;
      for (let i = 0; i < this.todos.length; i++) {
        if (todo.id === this.todos[i].id) {
          this.listToDo.listToDo[i].IsCompleted = todo.IsCompleted;
        }
      }
      this.todoService.updateList(this.listToDo).then(() => this.selectedToDo = null);
    }


  }

}
