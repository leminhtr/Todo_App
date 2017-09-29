import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import {ToDo} from './to-do';
// import {TODOS} from './mock-todo';
import {Http, Headers} from '@angular/http';
import {ListToDo} from './list-toDo';
import {toPromise} from 'rxjs/operator/toPromise';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ToDoService {
  /**
   * Subject object of the current selected themed list
   * @type {BehaviorSubject<ListToDo>}
   */
  private selectedList: Subject<ListToDo> = new BehaviorSubject<ListToDo>(null);

  /**
   * URL to web API
   * @type {string}
   */
  private todosUrl = 'api/toDoManager';

  /**
   * Http
   * @param {Http} http
   */
  constructor(private http: Http) { }

  /**
   * Headers
   * @type {Headers}
   */
  private headers = new Headers({'Content-Type': 'application/json'});

  /**
   * Handle the error, print it in the console err and return it into a promise
   * @param error
   * @return {Promise<any>}
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  /**
   * Create a todo and update the database by making an html post query to the API
   * Return a promise of the created toDo
   * @param {string} todo: The name of the toDo to be created
   * @return {Promise<ToDo>}: The promise of the toDo
   */
  create(todo: string): Promise<ToDo> {
    return this.http
      .post(this.todosUrl, JSON.stringify({task: todo}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as ToDo)
      .catch(this.handleError);
  }

  // *** toDoManager CRUD methods ***//
  /**
   * Fetch the list of themed list by making an html get query to the API
   * Return the list of themed list
   * @return {Promise<ListToDo[]>}: The promise of the list of themed list
   */
  getToDoManager(): Promise<ListToDo[]> {
    return this.http.get(this.todosUrl).toPromise()
      .then(response => response.json().data as ListToDo[])
      .catch(this.handleError);
  }

  /**
   * Fetch a list of toDo by making an html get query to the API
   * Return a promise of a list of toDo
   * @param {number} id: The id the of the themed list to be fetched
   * @return {Promise<ListToDo>}: The promise of a list of toDo
   */
  getListToDo(id: number): Promise<ListToDo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as ListToDo)
      .catch(this.handleError);
  }

  /**
   * Create a list of toDo and update the database by making an html post query to the API
   * Return a promise of the created list of toDo
   * @param {string} listName: The name of the new list
   * @return {Promise<ListToDo>}: The promise of new list of toDo
   */
  createListToDo(listName: string): Promise<ListToDo> {
    return this.http
      .post(this.todosUrl, JSON.stringify({name: listName}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as ListToDo)
      .catch(this.handleError);
  }

  /**
   * Delete a list from the database of todo using its id by making an html delete query to the API
   * @param {number} id: The id of the list to be deleted
   * @return {Promise<void>}:
   */
  deleteListToDo(id: number): Promise<void> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  /**
   * Update the current database by the list given in parameters by making an html put request.
   * Return a promise of the updated list of themed list
   * @param {ListToDo} list: The list that will be sync to the database
   * @return {Promise<ToDo>}: Return a promise of the updated list of themed list
   */
  updateList(list: ListToDo): Promise<ToDo> {
    const url = `${this.todosUrl}/${list.id}`;
    return this.http
      .put(url, JSON.stringify(list), {headers: this.headers})
      .toPromise()
      .then(() => list)
      .catch(this.handleError);
  }


  /**
   * Send list to all the Observer
   * @param {ListToDo} list: The list to send
   */
  sendSelectedList(list: ListToDo) {
    this.selectedList.next(list);
  }

  /**
   * Return an Observable of the list
   * @return {Observable<any>}
   */
  getSelectedList(): Observable<any> {
    return this.selectedList.asObservable();
  }
}
