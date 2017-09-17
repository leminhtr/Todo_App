import { Component, OnInit } from '@angular/core';
import {listToDo} from '../../list-toDo';
import {ToDoService} from '../to-do.service';
import {ToDo} from '../to-do';

@Component({
  selector: 'app-to-do-manager',
  templateUrl: './to-do-manager.component.html',
  styleUrls: ['./to-do-manager.component.css'],
  providers: [ToDoService]
})
export class ToDoManagerComponent implements OnInit {

  ToDoManager: listToDo[];
  selectedListToDo: listToDo;

  constructor(
    private todoService: ToDoService
  ) { }

  getToDoManager(): void {  // get data from ToDo service, using its method
    // sets the component's heroes property to the array of heroes returned by the service.
    this.todoService.getToDoManager().then(TDManager => this.ToDoManager = TDManager);
  }
  ngOnInit() {
    this.getToDoManager();
  }

  onSelect(listTD: listToDo): void {
    this.selectedListToDo = listTD;
  }

  addList(listName: string): void {
    listName = listName.trim();
    if (!listName) { return; }
    this.todoService.createList(listName)
      .then(listToDo => {
        this.ToDoManager.push(listToDo);
        this.selectedListToDo = null;
      });
  }

  deleteList(list: listToDo): void {
    this.todoService
      .delete(list.id)
      .then(() => {
        this.ToDoManager = this.ToDoManager.filter(l => l !== list);
        if (this.selectedListToDo === list) { this.selectedListToDo = null; }
      });
  }







}
