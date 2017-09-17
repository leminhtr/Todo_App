import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import {ToDo} from './to-do';
// import {TODOS} from './mock-todo';
import {Http, Headers} from '@angular/http';
import {ListToDo} from './list-toDo';
import {toPromise} from "rxjs/operator/toPromise";

@Injectable()
export class ToDoService {

  private todosUrl = 'api/todos'; // URL to web API

  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // getToDos(): Promise<ToDo[]> {
  //   return Promise.resolve(TODOS);
  // }
  getToDos(): Promise<ToDo[]> {
    return this.http.get(this.todosUrl)
      .toPromise()
      .then(response => response.json().data as ToDo[])
      .catch(this.handleError);
  }

  getToDo(id: number): Promise<ToDo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as ToDo)
      .catch(this.handleError);
  }
  create(todo: string): Promise<ToDo> {
    return this.http
      .post(this.todosUrl, JSON.stringify({task: todo}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as ToDo)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // ToDoManager CRUD methods
  getToDoManager(): Promise<ListToDo[]> {
    return this.http.get(this.todosUrl).toPromise()
      .then(response => response.json().data as ListToDo[])
      .catch(this.handleError);

  }

  getListToDo(id: number): Promise<ListToDo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as ListToDo)
      .catch(this.handleError);
  }

  createListToDo(listName: string): Promise<ListToDo> {
    return this.http
      .post(this.todosUrl, JSON.stringify({name: listName}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as ListToDo)
      .catch(this.handleError);
  }

  deleteListToDo(id: number): Promise<void> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  updateList(list: ListToDo): Promise<ToDo> {
    const url = `${this.todosUrl}/${list.id}`;
    return this.http
      .put(url, JSON.stringify(list), {headers: this.headers})
      .toPromise()
      .then(() => list)
      .catch(this.handleError);
  }

}
