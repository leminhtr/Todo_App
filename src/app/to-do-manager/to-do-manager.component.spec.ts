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
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';

describe('ToDoManagerComponent', () => {
  let component: ToDoManagerComponent;
  let todoService: ToDoService;
  let fixture: ComponentFixture<ToDoManagerComponent>;
  let de: DebugElement;
  const mockData: ListToDo = new ListToDo(0, 'Holiday', Array<ToDo>(), false);
  let spy: any;

  let mokTaskManager: ListToDo;
  let mokArray: Array<ListToDo>;
  let mokArray2: Array<ListToDo>;

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
    mokTaskManager = new ListToDo(1, 'list1', Array<ToDo>(), false);
    mokArray = new Array<ListToDo>();
    mokArray[0] = mokTaskManager;

    fixture = TestBed.createComponent(ToDoManagerComponent);
    de = fixture.debugElement;
    component = fixture.componentInstance;
    todoService = de.injector.get(ToDoService) as any;
    // todoService = TestBed.get(ToDoService);
    // spy = spyOn(todoService, 'deleteListToDo').and.returnValue(Promise.resolve(null));
    // spy = spyOn(component, 'getToDoManager').and.returnValue(Promise.resolve(null));
    spy = spyOn(component, 'getToDoManager').and.callFake(() => {
      component.toDoManager = mokArray;
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeTruthy();
  });

  //
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ToDoManagerComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  /**
   * Test if to toDoManager is initialized with data from service
   */
  // it('should get toDoManager when initialized', async(() => {
  //   component.ngOnInit();
  //   // const fakeList = new ListToDo(0, 'Holiday', [], false);
  //   const fakeList = new ListToDo(0, 'Holiday', [], false);
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(component.toDoManager[0]).toBe(fakeList);
  //   });
  // }));

  it('should delete a List when the trash button is clicked', async(() => {
    fixture.whenStable().then(() => {
      const el = de.nativeElement.querySelector('.remove');
      el.click();
      fixture.whenStable().then(() => {
        expect(component.toDoManager.length).toBe(1);

      });
    });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ToDoManagerComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  /**
   * deleteList unit test
   */
  // it('should get toDoManager of length 0', async(() => {
  //   component.ngOnInit();
  //   fixture = TestBed.createComponent(ToDoManagerComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     component.toDoManager[0] = new ListToDo(0, 'Holiday', [], false);
  //     component.deleteList(component.toDoManager[0]);
  //     console.log(component.toDoManager);
  //     console.log(component.toDoManager.length);
  //     expect(component.toDoManager.length).toEqual(1);
  //   });
  // // }));
  // it('should get toDoManager of length 0', async(() => {
  //   component.ngOnInit();
  //   // fixture = TestBed.createComponent(ToDoManagerComponent);
  //   let element = fixture.nativeElement;      // to access DOM element
  //   // component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     component.toDoManager[0] = mockData;
  //     component.deleteList(component.toDoManager[0]);
  //     console.log(component.toDoManager);
  //     console.log(component.toDoManager.length);
  //     expect(component.toDoManager.length).toEqual(1);
  //   });
  // }));

  // it('should get toDoManager with new element', async(() => {
  //   component.ngOnInit();
  //   // const fakeList = new ListToDo(0, 'Holiday', [], false);
  //   const fakeList = new ListToDo(0, 'Holiday', [], false);
  //   const emptyList = new Array<void>();
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(component.deleteList(component.toDoManager[0])).toBeEmptyArray();
  //   });
  // }));
});
