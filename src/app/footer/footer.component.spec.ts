import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, Input, OnInit} from '@angular/core';
import {ListToDo} from '../list-toDo';
import {ToDoService} from '../to-do.service';

import { FooterComponent } from './footer.component';
import {ToDo} from '../to-do';
import {InMemoryDataService} from '../in-memory-data.service';
import {APP_BASE_HREF} from '@angular/common';
import {AppRoutingModule} from '../../app-routing.module';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../app.component';
import {ToDoManagerComponent} from '../to-do-manager/to-do-manager.component';
import {ToDosComponent} from '../to-dos/to-dos.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  const list: ListToDo = new ListToDo(1, 'list1', Array<ToDo>(), false);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent, AppComponent, ToDoManagerComponent, ToDosComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule],
      providers: [{provide : APP_BASE_HREF, useValue: '/'}, ToDoService, InMemoryDataService]
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
