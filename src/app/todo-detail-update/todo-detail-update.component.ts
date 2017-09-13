import {Component, Input, OnInit} from '@angular/core';
import {ToDo} from '../to-do';

@Component({
  selector: 'app-todo-detail-update',
  templateUrl: './todo-detail-update.component.html',
  styleUrls: ['./todo-detail-update.component.css']
})
export class TodoDetailUpdateComponent implements OnInit {

  @Input() todo: ToDo;

  constructor() { }

  ngOnInit() {
  }

}
