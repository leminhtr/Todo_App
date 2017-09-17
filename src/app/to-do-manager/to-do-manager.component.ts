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

  ToDoManager: ListToDo[];  // List of list of ToDo
  selectedListToDo: ListToDo;

  constructor(
    private todoService: ToDoService
  ) { }

  getToDoManager(): void {  // get data from ToDo service, using its method
    this.todoService.getToDoManager().then(TDManager => this.ToDoManager = TDManager);
  }
  ngOnInit(): void {
    this.getToDoManager();
  }

  onSelect(listTD: ListToDo): void {
    this.selectedListToDo = listTD;
  }

  addList(listName: string): void {
    listName = listName.trim();
    if (!listName) { return; }
    this.todoService.createListToDo(listName) // if listName not empty then todoService creates a list and returns it as ListToDo
      .then(ListToDo => {
        ListToDo.listToDo = new Array<ToDo>();  // init the list
        this.ToDoManager.push(ListToDo);  // add it to the ToDoManager
        this.selectedListToDo = null;
      });
  }

  deleteList(list: ListToDo): void {
    this.todoService
      .deleteListToDo(list.id)
      .then(() => {
        this.ToDoManager = this.ToDoManager.filter(l => l !== list);
        if (this.selectedListToDo === list) { this.selectedListToDo = null; }
      });
  }







}
