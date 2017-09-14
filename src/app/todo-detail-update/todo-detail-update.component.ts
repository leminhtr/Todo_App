import 'rxjs/operator/switchMap';
import 'rxjs/add/operator/switchMap';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from '@angular/router';
import {Location} from '@angular/common';

import {ToDo} from '../to-do';
import {ToDoService} from '../to-do.service';

@Component({
  selector: 'app-todo-detail-update',
  templateUrl: './todo-detail-update.component.html',
  styleUrls: ['./todo-detail-update.component.css']
})
export class TodoDetailUpdateComponent implements OnInit {

  todo: ToDo;

  constructor(
    private todoService: ToDoService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    // '+' : cast 'id' string to number
    this.route.paramMap.switchMap((params: ParamMap) => this.todoService.getToDo(+params.get('id'))).subscribe(todo => this.todo = todo);

  }

  goBack(): void {
    this.location.back();
  }

}
