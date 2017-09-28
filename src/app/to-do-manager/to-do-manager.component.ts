import { Component, OnInit } from '@angular/core';
import {ListToDo} from '../list-toDo';
import {ToDoService} from '../to-do.service';
import {ToDo} from '../to-do';

@Component({
  selector: 'app-to-do-manager',
  templateUrl: './to-do-manager.component.html',
  styleUrls: ['./to-do-manager.component.css'],
  providers: [ToDoService]
})
export class ToDoManagerComponent implements OnInit {

  /**
   * @property {ListToDo[]} toDoManager: The list of the themed list of ToDo
   */
  toDoManager: ListToDo[];  // List of list of ToDo

  /**
   * @property {ListToDo} selectListToDo: The selected themed list
   */
  selectedListToDo: ListToDo;

  /**
   * @property {boolean} isEditListName: Is the list name in edit mode
   */
  isEditListName: false;

  /**
   * @constructor Constructor of ToDoManager
   * @param {ToDoService} todoService: The service to get the data from
   */
  constructor(private todoService: ToDoService) {}

  /** Get the list of ToDo from the service
   * Initialize the toDoManager attribute
   */
  getToDoManager(): void {
    // get data from ToDo service, using its method
    this.todoService.getToDoManager()
      .then(TDManager => this.toDoManager = TDManager);
  }

  /**
   * Call the getToDoManager method to initialize the toDoManager attribute
   * on Component initialization
   */
  ngOnInit(): void {
    this.toDoManager = new Array<ListToDo>();
    this.getToDoManager();
  }

  /**
   * Assign the selectedListToDo attribute to the parameter: the selected themed list
   * @param {ListToDo} listTD : The list of ToDo of the selected themed list
   */
  onSelect(listTD: ListToDo): void {
    this.selectedListToDo = listTD;
    this.sendSelectedList(listTD);
  }

  /**
   * Seek if a name of list already exists (Case insensitive)
   * @param {string} listName: The name of the list to be checked
   * @return {boolean}: Duplicate or not.
   */
  isDuplicateListName(listName: string): boolean {
    for (let i = 0 ; i < this.toDoManager.length ; i++) {
      // make the boolean test be case insensitive
      if (this.toDoManager[i].name.toLowerCase() === listName.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Add a new list to the existing list of themed list and to the database
   * Create a list of name 'listName'; Update the database and the toDoManager list attribute
   * @param {string} listName : The name of the new themed list to create
   */
  addList(listName: string): void {
    // remove whitespace
    listName = listName.trim();
    // stop if listName empty
    if (!listName) {
      return;
    }
    if (this.isDuplicateListName(listName)) {
      alert('This list of To Do already exists.');
      return;
    }
    // if listName not empty and not duplicate then todoService creates a list and returns it as ListToDo
    this.todoService.createListToDo(listName)
      .then(listToDo => {
        // init the list of list of todo
        listToDo.listToDo = new Array<ToDo>();
        // add it to the toDoManager
        this.toDoManager.push(listToDo);
        // remove the focus on the selected list
        this.selectedListToDo = null;
      });
  }

  /**
   * Delete the list "list" from the database and toDoManager list attribute
   * Search the list from the service in the database by seeking matching id
   * @param {ListToDo} list : The list to be deleted
   */
  deleteList(list: ListToDo): void {
    // exit edit mode if in edit mode
    this.isEditListName = false;
    // delete the list from the database using todo service
    this.todoService
      .deleteListToDo(list.id)
      .then(() => {
      // remove the list from the displayed themed list
        this.toDoManager = this.toDoManager.filter(l => l !== list);
        if (this.selectedListToDo === list) {
          // remove the selected list focus
          this.selectedListToDo = null;
        }
      });
  }

  /**
   * Edit the themed list name if not blank
   * @param {string} listName
   */
  edit(listName: string): void {
    // remove whitespace
    listName = listName.trim();
    // stop if listName empty
    if (!listName) {
      return;
    }
    // else edit the name
    this.selectedListToDo.name = listName;
    // exit edit mode
    this.isEditListName = false;
  }

  /**
   * Send the selected list to the subscribers
   * @param {ListToDo} list
   */
  sendSelectedList(list: ListToDo): void {
    this.todoService.sendSelectedList(list);
  }

}
