import { Component, OnInit } from '@angular/core';

import { ToDoService } from './to-do.service';

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
