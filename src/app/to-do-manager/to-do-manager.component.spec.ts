import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoManagerComponent } from './to-do-manager.component';
import {FooterComponent} from '../footer/footer.component';
import {ToDosComponent} from '../to-dos/to-dos.component';

import {Component, NgModule, OnInit} from '@angular/core';
import {ListToDo} from '../list-toDo';
import {ToDoService} from '../to-do.service';
import {ToDo} from '../to-do';
import {AppComponent} from '../app.component';
import {AppRoutingModule} from '../../app-routing.module';
import {InMemoryDataService} from '../in-memory-data.service';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';

describe('ToDoManagerComponent', () => {
  let component: ToDoManagerComponent;
  let fixture: ComponentFixture<ToDoManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoManagerComponent, FooterComponent, ToDosComponent, AppComponent ],
      imports: [BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule],
      providers: [{provide : APP_BASE_HREF, useValue: '/'}, ToDoService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
