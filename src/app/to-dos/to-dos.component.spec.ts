import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDosComponent } from './to-dos.component';
import {FormsModule} from '@angular/forms';
import {Component, Input, OnInit} from '@angular/core';
import { ToDo } from '../to-do';
import { ToDoService } from '../to-do.service';
import {Router} from '@angular/router';
import {ListToDo} from '../list-toDo';
import {APP_BASE_HREF} from '@angular/common';
import {AppRoutingModule} from '../../app-routing.module';
import {InMemoryDataService} from '../in-memory-data.service';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {ToDoManagerComponent} from '../to-do-manager/to-do-manager.component';
import {FooterComponent} from "../footer/footer.component";


describe('ToDosComponent', () => {
  let component: ToDosComponent;
  let fixture: ComponentFixture<ToDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDosComponent, ToDoManagerComponent, FooterComponent ],
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
    fixture = TestBed.createComponent(ToDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
