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
  constructor(
    private todoService: ToDoService) {}

  /** Get the list of ToDo from the service
   * Initialize the toDoManager attribute
   */
  getToDoManager(): void {  // get data from ToDo service, using its method
    this.todoService.getToDoManager().then(TDManager => this.toDoManager = TDManager);
    // this.onSelect(this.toDoManager[0]);
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
   * Add a new list to the existing list of themed list and to the database
   * Create a list of name 'listName'; Update the database and the toDoManager list attribute
   * @param {string} listName : The name of the new themed list to create
   */
  addList(listName: string): void {
    listName = listName.trim();
    if (!listName) {
      return;
    }
    this.todoService.createListToDo(listName) // if listName not empty then todoService creates a list and returns it as ListToDo
      .then(listToDo => {
        listToDo.listToDo = new Array<ToDo>();  // init the list
        this.toDoManager.push(listToDo);  // add it to the toDoManager
        this.selectedListToDo = null; // remove the focus on the selected list
      });
  }

  /**
   * Delete the list "list" from the database and toDoManager list attribute
   * Search the list from the service in the database by seeking matching id
   * @param {ListToDo} list : The list to be deleted
   */
  deleteList(list: ListToDo): void {
    this.todoService
      .deleteListToDo(list.id)
      .then(() => {
        this.toDoManager = this.toDoManager.filter(l => l !== list);
        if (this.selectedListToDo === list) {
          this.selectedListToDo = null;
        }
      });
  }

  //
  // saveList(): void {
  //   this.todoService.updateList(this.selectedListToDo).then();
  // }


  /**
   *  Edit the themed list name
   * @param {string} listName
   */
  edit(listName: string): void {
    this.selectedListToDo.name = listName;
  }

  sendSelectedList(list: ListToDo): void {
    this.todoService.sendSelectedList(list);
  }

}
