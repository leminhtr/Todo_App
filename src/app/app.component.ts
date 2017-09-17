import { Component, OnInit } from '@angular/core';

import { ToDo } from './to-do';
import { ToDoService } from './to-do.service';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToDoService]
})
export class AppComponent implements OnInit {
  title = 'TODO App';
  constructor() { }

  ngOnInit() {
  }

}




