import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import {ToDo} from './to-do';
// import {TODOS} from './mock-todo';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ToDoService {

  private todosUrl = 'api/todos'; // URL to web API

  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});
  update(todo: ToDo): Promise<ToDo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http
      .put(url, JSON.stringify(todo), {headers: this.headers})
      .toPromise()
      .then(() => todo)
      .catch(this.handleError);
  }

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
      .catch(this.handleError);  }

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

}
