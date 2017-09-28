import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoManagerComponent } from './to-do-manager.component';
import {FooterComponent} from '../footer/footer.component';
import {ToDosComponent} from '../to-dos/to-dos.component';

import {DebugElement, NgModule, OnInit} from '@angular/core';
import {ListToDo} from '../list-toDo';
import {ToDoService} from '../to-do.service';
import {ToDo} from '../to-do';
import {AppComponent} from '../app.component';
import {AppRoutingModule} from '../../app-routing.module';
import {InMemoryDataService} from '../in-memory-data.service';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule, By} from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

describe('ToDoManagerComponent', () => {
  let component: ToDoManagerComponent;
  let todoService: ToDoService;
  let fixture: ComponentFixture<ToDoManagerComponent>;
  let de: DebugElement;
  let spy: any;

  let mokToDoManager: ListToDo;
  let mokArray: Array<ListToDo>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoManagerComponent, FooterComponent, ToDosComponent, AppComponent ],
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
    mokToDoManager = new ListToDo(1, 'Holiday', Array<ToDo>(), false);
    mokArray = new Array<ListToDo>();
    mokArray[0] = mokToDoManager;

    fixture = TestBed.createComponent(ToDoManagerComponent);
    de = fixture.debugElement;
    component = fixture.componentInstance;
    todoService = de.injector.get(ToDoService) as any;
    spy = spyOn(component, 'getToDoManager').and.callFake(() => {
      component.toDoManager = mokArray;
    });
    fixture.detectChanges();
  });

  /**
   * Create component test
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /**
   * Test if to toDoManager is initialized with correct data from service
   */
  it('should get toDoManager when initialized', async(() => {
    component.ngOnInit();
    const fakeList = new ListToDo(1, 'Holiday', [], false);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.toDoManager[0]).toEqual(fakeList);
    });
  }));

  /**
   * deleteList unit test
   */
  it('should delete a list when the trash button is clicked', async(() => {
    fixture.whenStable().then(() => {
      const el = de.nativeElement.querySelector('.remove');
      el.click();
      fixture.whenStable().then(() => {
        expect(component.toDoManager.length).toBe(0);

      });
    });
  }));

  /**
   * edit button unit test
   */
  it('should edit the name of the list', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // get edit button to enter edit list name mode
      const editButton = de.nativeElement.querySelector('#editButton');
      editButton.click();
      // when view is stable
      fixture.whenStable().then(() => {
        // detectChanges on input
        fixture.detectChanges();
        // get input element and put test value
        const input = de.nativeElement.querySelector('#editListInput');
        input.value = 'listEdited';
        // get edit confirm button to change value
        const editConfirm = de.nativeElement.querySelector('#editConfirm');
        editConfirm.click();
        // when view is stable
        fixture.whenStable().then(() => {
          expect(component.toDoManager[0].name).toContain('listEdited');
        });
      });
    });
  }));

  /**
   * add button unit test
   */
  it('should add a new list and increment the length of the toDoManager list', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      // detectChanges on input
      fixture.detectChanges();
      // get input element and put test value
      const input = de.nativeElement.querySelector('#inputList');
      input.value = 'newList';
      // get edit button to enter edit list name mode
      const addButton = de.nativeElement.querySelector('#addListButton');
      addButton.click();
      // when view is stable
      fixture.whenStable().then(() => {
        // when view is stable
        expect(component.toDoManager.length).toBe(2);
        expect(component.toDoManager[1].name).toContain('newList');
      });
    });
  }));

});
