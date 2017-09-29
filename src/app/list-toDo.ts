import {ToDo} from './to-do';

export class ListToDo {
  /**
   * The constructor of the ListToDo class
   * @constructor
   * @param {number} id: The id of the list
   * @param {string} name: The name of the list
   * @param {ToDo[]} listToDo: The list of ToDo
   * @param {boolean} isAllDone: Is all the ToDo are done
   */
  public constructor(public id: number,
                     public name: string,
                     public listToDo: ToDo[],
                     public isAllDone: boolean) {
  }
}
