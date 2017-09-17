import {ToDo} from './to-do';

export class ListToDo {
  public constructor(public id: number,
                     public name: string,
                     public listToDo: ToDo[],
                     public isAllDone: boolean) {
  }
}
