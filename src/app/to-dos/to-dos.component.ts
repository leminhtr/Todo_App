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
  todos: ToDo[] = [];
  selectedToDo: ToDo;

  @Input() listToDo: ListToDo;

  constructor(private router: Router,
              private todoService: ToDoService) {
  }

  onSelect(todo: ToDo): void {
    this.selectedToDo = todo;
  }

  getToDos(idList): void {  // get data from ToDo service, using its method
    // sets the component's heroes property to the array of heroes returned by the service.
    this.todoService.getListToDo(idList).then(list => this.todos = list.listToDo);
  }

  ngOnInit(): void { // get data on component init
    this.getToDos(this.listToDo.id);
  }

  // gotoDetail(): void {
  //   this.router.navigate(['/detail', this.selectedToDo.id]);
  // }

  add(task: string): void {
    task = task.trim();
    if (!task) {
      return;
    }

    if (!this.todos) {
      this.todos = new Array<ToDo>();
    }
    let newToDo: ToDo;
    if (this.listToDo.listToDo.length === 0) {
      newToDo = new ToDo(this.listToDo.listToDo.length, task, false);
    } else {
      newToDo = new ToDo(this.listToDo.listToDo[this.listToDo.listToDo.length - 1].id + 1, task, false);
    }
    this.listToDo.listToDo.push(newToDo);
    this.todoService.updateList(this.listToDo)
      .then(list => {
        this.todos.push(this.listToDo.listToDo[this.listToDo.listToDo.length - 1]);
        this.selectedToDo = null;
      });
  }

  deleteToDo(todo: ToDo): void {
    this.listToDo.listToDo.splice(todo.id, 1);
    this.todoService
      .updateList(this.listToDo)
      .then(() => {
        this.todos = this.todos.filter(t => t !== todo);
        if (this.selectedToDo === todo) {
          this.selectedToDo = null;
        }
      });
  }

  edit(td: ToDo): void {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id === td.id) {
        this.listToDo.listToDo[i].task = td.task;
      }
    }
    this.todoService.updateList(this.listToDo).then(() => this.selectedToDo = null);
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
