import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, Input, OnInit} from '@angular/core';
import {ListToDo} from '../list-toDo';
import {ToDoService} from '../to-do.service';

import { FooterComponent } from './footer.component';
import {ToDo} from '../to-do';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  const list: ListToDo = new ListToDo(1, 'list1', Array<ToDo>(), false);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    const fakeList = new ListToDo(1, 'list1', Array<ToDo>(), false);
    component.selectedList = fakeList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
