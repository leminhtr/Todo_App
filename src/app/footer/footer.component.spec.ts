import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement, Input, OnInit} from '@angular/core';


import {InMemoryDataService} from '../in-memory-data.service';
import {APP_BASE_HREF} from '@angular/common';
import {AppRoutingModule} from '../../app-routing.module';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule, By} from '@angular/platform-browser';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

import {ToDo} from '../to-do';
import {AppComponent} from '../app.component';
import {ToDoManagerComponent} from '../to-do-manager/to-do-manager.component';
import {ToDosComponent} from '../to-dos/to-dos.component';
import { FooterComponent } from './footer.component';
import {ListToDo} from '../list-toDo';
import {ToDoService} from '../to-do.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let de: DebugElement;
  let mokListToDo: ListToDo;
  let mokToDo: ToDo;

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
    de = fixture.debugElement;
    component = fixture.componentInstance;

    mokListToDo = new ListToDo(1, 'Holiday', Array<ToDo>(), false);
    mokToDo = new ToDo(1, 'coffee', false);
    mokListToDo.listToDo[0] = mokToDo;
    component.selectedList = mokListToDo;

    fixture.detectChanges();
  });

  /**
   * Create component test
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test if to footer is initialized with correct selectedList Name
   */
  it('should get the name of the selected list when initialized', async(() => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // Get h3 list name element
      const elemListName = de.nativeElement.querySelector('#listName');
      expect(elemListName.innerText).toContain('Holiday');
    });
  }));

});
