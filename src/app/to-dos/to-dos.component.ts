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

  /**
   * @property {ToDo[]} todos: The list of todos
   * @type {Array}
   */
  todos: ToDo[] = [];

  /**
   * @property {ToDO} selectedToDo: The selected toDo
   */
  selectedToDo: ToDo;

  /**
   * @property {ListToDo} listToDo: The list of ToDo of the themed list, selected by ToDoManagerComponent
   */
  @Input() listToDo: ListToDo;
  /**
   * @property {string} listName: The name of the themed list, selected by ToDoManagerComponent
   * @type {string}
   */
  @Input() listName: string = '';

  /**
   * Constructor of ToDoComponent
   * @constructor
   * @param {ToDoService} todoService: The service to fetch the data from
   */
  constructor(private todoService: ToDoService) {
  }

  /**
   * Assign the selectedToDo attribute to the parameter: the selected toDo
   * @param {ToDo} todo : The list of ToDo of the selected themed list
   */
  onSelect(todo: ToDo): void {
    this.selectedToDo = todo;
  }

  /**
   * Get a list of todo from the database using its id
   * @param idList: The id of the list
   */
  getToDos(idList): void {  // get data from ToDo service, using its method
    // sets the component's heroes property to the array of heroes returned by the service.
    this.todoService.getListToDo(idList).then(list => this.todos = list.listToDo);
  }

  /**
   * Call the getToDos method to initialize the listToDo attribute
   * on Component initialization
   */
  ngOnInit(): void { // get data on component init
    this.getToDos(this.listToDo.id);
  }

  /**
   * Add a todo to the existing list and to the database
   * Create a new toDo of name 'task'; Update the database and the todos list attribute
   * @param {string} task: The name of the task of the new todo
   */
  add(task: string): void {
    task = task.trim(); // Remove whitespace
    if (!task) {  // if task is undefined then end
      return;
    }

    if (!this.todos) {  // if the list of todos is undefined
      this.todos = new Array<ToDo>(); // then create a new array of ToDo
    }
    let newToDo: ToDo; // the new toDo to be created
    // if the list of toDo is empty
    if (this.listToDo.listToDo.length === 0) {
      // then create a new toDo of name task, not done and take the next available id
      newToDo = new ToDo(this.listToDo.listToDo.length, task, false);
    } else {
      // else create a new toDo of name task, and not done and and take the next available id
      newToDo = new ToDo(this.listToDo.listToDo[this.listToDo.listToDo.length - 1].id + 1, task, false);
    }
    // push it to the list of todos of the listToDo attribute
    this.listToDo.listToDo.push(newToDo);
    // update the database using the service and the the toDo list "todos"
    this.todoService.updateList(this.listToDo)
      .then(list => {
        this.todos.push(this.listToDo.listToDo[this.listToDo.listToDo.length - 1]);
        this.selectedToDo = null;
      });
  }

  /**
   * Delete the todo "todo" from the database and the list of todos of the "listToDo" attribute
   * Search the list from the service in the database by seeking matching id
   * @param {ToDo} todo: The toDo to be deleted
   */
  deleteToDo(todo: ToDo): void {
    // Search the todo using its id in the list of todo of listToDo attribute
    for (let i = 0; i < this.listToDo.listToDo.length; i++) {
      if (this.listToDo.listToDo[i].id === todo.id) {
        // delete this todo from the list
        this.listToDo.listToDo.splice(i, 1);
        this.todos.splice(i, 1);
      }
    }
    // Then update the database using the service
    this.todoService
      .updateList(this.listToDo)
      .then(() => {
        this.todos = this.todos.filter(t => t !== todo);
        if (this.selectedToDo === todo) {
          this.selectedToDo = null;
        }
      });
    // Check if the list of todos is all done after deletion
    this.isAllDone(true);

  }

  /**
   * Edit the task of the toDo
   * @param {ToDo} td: The toDo to be edited
   */
  edit(td: ToDo): void {
    // Search the todo using its id in the list of todo of listToDo attribute
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id === td.id) {
        this.listToDo.listToDo[i].task = td.task;
      }
    }
    // Then update the database using the service
    this.todoService.updateList(this.listToDo).then(() => this.selectedToDo = null);
  }

  /**
   * Edit the IsCompleted attribute of the toDo
   * @param {ToDo} td
   */
  editChecked(td: ToDo): void {
    // Search the todo using its id in the list of todo of listToDo attribute
    td.IsCompleted = !td.IsCompleted;
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id === td.id) {
        this.listToDo.listToDo[i].IsCompleted = td.IsCompleted;
      }
    }
    // Then update the database using the service
    this.todoService.updateList(this.listToDo).then(() => this.selectedToDo = null);
  }

  // updateTask(todo: ToDo): void {
  //     for (let i = 0; i < this.todos.length; i++) {
  //       if (todo.id === this.todos[i].id) {
  //         this.listToDo.listToDo[i].IsCompleted = todo.IsCompleted;
  //       }
  //     }
  //     this.todoService.updateList(this.listToDo).then(() => this.selectedToDo = null);
  // }

  /**
   * Check if the list of todo has all of its todos done
   * @param {boolean} toBeChecked: Is a complete check of the list necessary, or not
   */
  isAllDone(toBeChecked: boolean): void {
    // if check if all done not necessary
    if (!toBeChecked) {
      this.listToDo.isAllDone = false; // update isAllDone value
      this.todoService.updateList(this.listToDo).then(() => 1);
    } else {
      // else check for every todo element
      let isDone: boolean = false;
      // if the list is empty then list is not all done
      if (this.todos.length === 0) {
        isDone = false;
      }
      // Check if IsCompleted for every element of the list
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].IsCompleted) {
          isDone = true;
        } else {
          // if at least one todo is not done then false, update the list and end
          isDone = false;  // else if no todo is not {not done} => return true
          this.listToDo.isAllDone = isDone; // update isAllDone value
          this.todoService.updateList(this.listToDo).then(() => 1);
          return; // end
        }
      }
      // update isAllDone value to the list
      this.listToDo.isAllDone = isDone;
      // update isAllDone value to the database
      this.todoService.updateList(this.listToDo).then(() => 1);
      // }
    }
  }

  /**
   * Count the number of todo that is not done yet from "list" todos
   * @return {number} : The number of todo not done yet
   */
  countNotDone(): number {
    let n: number = 0;
    for (let i = 0 ; i < this.todos.length ; i++ ) {
      if (this.todos[i].IsCompleted === false) {
        n++;
      }
    }
    return n;
  }
}
