import { Component, OnInit } from '@angular/core';

import { ToDoService } from './to-do.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToDoService]
})
export class AppComponent implements OnInit {
  /**
   * Title of the App
   * @type {string}
   */
  title = 'TODO App';

  /** Default constructor
   * @constructor
   */
  constructor() { }

  /**
   * ngOnInit
   */
  ngOnInit() {
  }

}
