import {Component, Input, OnInit} from '@angular/core';
import { ToDo } from '../to-do';
import { ToDoService } from '../to-do.service';
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
   * @property {ToDo} selectedToDo: The selected toDo of the themed list
   */
  selectedToDo: ToDo;

  /**
   * @property {ListToDo} listToDo: The themed list of ToDo, selected by ToDoManagerComponent
   */
  @Input() listToDo: ListToDo;
  /**
   * @property {string} listName: The name of the themed list, selected by ToDoManagerComponent
   * @type {string}
   */
  @Input() listName = '';

  /**
   * Constructor of ToDoComponent
   * @param {ToDoService} todoService: The service to fetch the data from
   */
  constructor(private todoService: ToDoService) {
  }

  /**
   * Assign the selectedToDo attribute to the parameter: the selected toDo
   * @param {ToDo} todo: The selected ToDo of the selected themed list
   */
  onSelect(todo: ToDo): void {
    this.selectedToDo = todo;
  }

  /**
   * Get the list of todo of a themed list from the database using its id
   * @param idList: The id of the list
   */
  getToDos(idList): void {
    // get data from ToDo service, using its method
    this.todoService.getListToDo(idList)
      .then(list => this.todos = list.listToDo);
  }

  /**
   * Call the getToDos method to initialize the list of ToDo
   * on Component initialization
   */
  ngOnInit(): void { // get data on component init
    this.getToDos(this.listToDo.id);
  }

  /**
   * Add a todo to the existing list and to the database
   * Create a new toDo of name 'newTask'; Update the database and the todos list attribute
   * @param {string} newTask: The name of the newTask of the new todo
   */
  add(newTask: string): void {
    // remove whitespace
    newTask = newTask.trim();
    // stop if newTask empty string
    if (!newTask) {
      return;
    }

    // if the list of todos is undefined
    if (!this.todos) {
      // then create a new array of ToDo
      this.todos = new Array<ToDo>();
    }

    let newToDo: ToDo; // the new toDo to be created

    // if the list of toDo of the themed list is empty
    if (this.listToDo.listToDo.length === 0) {
      // then create a new toDo of name newTask, not done and take the next available id
      const nextAvailableId = this.listToDo.listToDo.length;
      newToDo = new ToDo(nextAvailableId, newTask, false);
    } else { // else the list of toDo is not empty
      // create a new toDo of name newTask, and not done and and take the next available id
      const lastToDo = this.listToDo.listToDo[this.listToDo.listToDo.length - 1];
      const nextAvailableId = lastToDo.id + 1;
      newToDo = new ToDo(nextAvailableId, newTask, false);
    }

    // push it to the list of todos of the themed list of toDo
    this.listToDo.listToDo.push(newToDo);
    // update the database using the service accordingly
    this.todoService.updateList(this.listToDo)
      .then(() => {
        // add the new toDo to the displayed list of toDo
        const newLastToDo = this.listToDo.listToDo[this.listToDo.listToDo.length - 1];
        this.todos.push(newLastToDo);

        // remove focus on selected toDo
        this.selectedToDo = null;
      });
  }

  /**
   * Delete the todo "todo" from the database and the list of todos of the "listToDo" attribute
   * Search the list from the service in the database by seeking matching id
   * @param {ToDo} todo: The toDo to be deleted
   */
  deleteToDo(todo: ToDo): void {
    const numberOfToDos = this.listToDo.listToDo.length;

    // Search the todo using its id in the list of todo of listToDo attribute
    for (let i = 0; i < numberOfToDos ; i++) {
      // when the toDo is found from its id
      if (this.listToDo.listToDo[i].id === todo.id) {
        // delete this toDo from the list of toDo of the themed list
        this.listToDo.listToDo.splice(i, 1);
        // delete this toDo from the displayed list of ToDo
        this.todos.splice(i, 1);
      }
    }

    // Then update the database using the service
    this.todoService
      .updateList(this.listToDo)
      .then(() => {
        // remove the todo from the displayed list of toDo
        this.todos = this.todos.filter(t => t !== todo);
        if (this.selectedToDo === todo) {
          // remove focus on selected toDo
          this.selectedToDo = null;
        }
      });

    // Check if the list of todos is all done after deletion
    this.isAllDone(true);
  }

  /**
   * Edit the task of the toDo
   * @param {ToDo} td
   * @param {string} editedTask
   */
  edit(td: ToDo, editedTask: string): void {
    // remove whitespace
    editedTask = editedTask.trim();
    // stop if newTask empty string
    if (!editedTask) {
      return;
    }

    // Search the todo using its id in the list of todo of listToDo attribute
    const numberOfToDos = this.todos.length;
    for (let i = 0; i < numberOfToDos ; i++) {
      // when the toDo is found from its id
      if (this.todos[i].id === td.id) {
        // update the list of toDo of the themed list
        this.listToDo.listToDo[i].task = editedTask;
        // update the displayed list of toDo
        this.selectedToDo.task = editedTask;
      }
    }
    // Update the database using the service
    this.todoService.updateList(this.listToDo)
    // Then remove focus on selected toDo
      .then(() => this.selectedToDo = null);
  }

  /**
   * Edit the IsCompleted attribute of the toDo
   * @param {ToDo} td: The toDo to edit the IsCompleted attribute
   */
  editChecked(td: ToDo): void {
    td.IsCompleted = !td.IsCompleted;

    // Search the todo using its id in the list of todo of listToDo attribute
    const numberOfToDos = this.todos.length;
    for (let i = 0; i < numberOfToDos ; i++) {
      // when the toDo is found from its id
      if (this.todos[i].id === td.id) {
        // Update the list of toDo of the themed list
        this.listToDo.listToDo[i].IsCompleted = td.IsCompleted;
      }
    }

    // Update the database using the service
    this.todoService.updateList(this.listToDo)
    // Then remove focus on selected toDo
      .then(() => this.selectedToDo = null);
  }

  /**
   * Check if the list of todo has all of its toDos done
   * @param {boolean} toBeChecked: Is a complete check necessary, or not
   */
  isAllDone(toBeChecked: boolean): void {
    // if complete check not necessary
    if (!toBeChecked) {
      // update isAllDone value
      this.listToDo.isAllDone = false;
      this.todoService.updateList(this.listToDo).then(() => 1);
    } else { // else check for every todo element
      let isDone = false;
      const numberOfToDos = this.todos.length;
      // if the list is empty then list is not done
      if (numberOfToDos === 0) {
        isDone = false;
      }
      // Check if IsCompleted for every element of the list
      for (let i = 0; i < numberOfToDos ; i++) {
        if (this.todos[i].IsCompleted) {
          isDone = true;
        } else { // else if at least one todo is not done
          // then false
          isDone = false;

          // update the themed list
          this.listToDo.isAllDone = isDone;
          // update the database using the service
          this.todoService.updateList(this.listToDo).then(() => 1);
          return; // end
        }
      }
      // else all toDos are done
      // then update the themed list
      this.listToDo.isAllDone = isDone;
      // update the database using the service
      this.todoService.updateList(this.listToDo).then(() => 1);
    }
  }

  /**
   * Count the number of todo that is not done yet from "list" todos
   * @return {number} : The number of todo not done yet
   */
  countNotDone(): number {
    let numberOfNotDoneToDos = 0;
    const totalNumberOfToDos: number = this.todos.length;

    for (let i = 0 ; i < totalNumberOfToDos ; i++ ) {
      if (this.todos[i].IsCompleted === false) {
        numberOfNotDoneToDos++;
      }
    }
    return numberOfNotDoneToDos;
  }
}
