import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDosComponent } from './to-dos.component';
import {FormsModule} from '@angular/forms';
import {Component, DebugElement, Input, OnInit} from '@angular/core';
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
import {FooterComponent} from '../footer/footer.component';


describe('ToDosComponent', () => {
  let component: ToDosComponent;
  let todoService: ToDoService;
  let fixture: ComponentFixture<ToDosComponent>;
  let de: DebugElement;
  let spy: any;
  let spyToDo: any;
  let spyUpdate: any;

  let mokToDo: ToDo;
  let mokArrayToDo: Array<ToDo>;
  let mokListToDo: ListToDo;
  let mokToDomanager: Array<ListToDo>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDosComponent, ToDoManagerComponent, FooterComponent ],
      imports: [BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule],
      providers: [{provide : APP_BASE_HREF, useValue: '/'}, ToDoService, InMemoryDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // new ToDo put in a list
    mokToDo = new ToDo(1, 'coffee', false);
    mokArrayToDo = new Array<ToDo>();
    mokArrayToDo[0] = mokToDo;

    // new ListToDo put in the ToDoManager
    mokListToDo = new ListToDo(1, 'Holiday', mokArrayToDo, false);
    mokToDomanager = new Array<ListToDo>();
    mokToDomanager[0] = mokListToDo;

    fixture = TestBed.createComponent(ToDosComponent);
    de = fixture.debugElement;
    component = fixture.componentInstance;
    todoService = de.injector.get(ToDoService) as any;
    component.listToDo = mokListToDo;

    spy = spyOn(todoService, 'getToDoManager').and.returnValue(Promise.resolve(mokToDomanager));
    spyToDo = spyOn(component, 'getToDos').and.callFake(() => {
      component.todos = mokArrayToDo;
    });
    spyUpdate = spyOn(todoService, 'updateList').and.returnValue(Promise.resolve(null));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test if to todos is initialized with data from service
   */
  it('should get todos when initialized', async(() => {
    component.ngOnInit();
    const fakeList = new ToDo(1, 'coffee', false);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.todos[0]).toEqual(fakeList);
    });
  }));

  /**
   * deleteToDo unit test
   */
  it('should delete a ToDo when the trash button is clicked', async(() => {
    fixture.whenStable().then(() => {
      const el = de.nativeElement.querySelector('.remove');
      el.click();
      fixture.whenStable().then(() => {
        expect(component.todos.length).toBe(0);

      });
    });
  }));

  /**
   * edit button unit test
   */
  it('should edit the name of the todos', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // get edit button to enter edit mode
      const editButton = de.nativeElement.querySelector('#editButton');
      editButton.click();
      // when view is stable
      fixture.whenStable().then(() => {
        // detectChanges on input
        fixture.detectChanges();
        // get input element and put test value
        const input = de.nativeElement.querySelector('#inputEdit');
        input.value = 'ToDoEdited';
        // get edit confirm button to change value
        const editConfirm = de.nativeElement.querySelector('#confirmEditButton');
        editConfirm.click();
        // when view is stable
        fixture.whenStable().then(() => {
          expect(component.todos[0].task).toContain('ToDoEdited');
        });
      });
    });
  }));

  /**
   * add button unit test
   */
  it('should add a new ToDo and increment the length of the todos list', async(() => {
    // fixture.detectChanges();
    fixture.whenStable().then(() => {
      // detectChanges on input
      fixture.detectChanges();
      // get input element and put test value
      const input = de.nativeElement.querySelector('#inputNewToDo');
      input.value = 'newToDo';
      // get edit button to enter edit list name mode
      const addButton = de.nativeElement.querySelector('#addToDoButton');
      addButton.click();
      // when view is stable
      fixture.whenStable().then(() => {
        component.todos.pop();
        // when view is stable
        expect(component.todos.length).toBe(2);
        expect(component.todos[1].task).toContain('newToDo');
      });
    });
  }));

});
