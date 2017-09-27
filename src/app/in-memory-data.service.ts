import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  /**
   * Create the database
   * @return {{toDoManager: ({id: number; name: string; listToDo: ({id: number; task: string; IsCompleted: boolean}
    * | {id: number; task: string; IsCompleted: boolean} | {id: number; task: string; IsCompleted: boolean})[]; isAllDone: boolean}
    * | {id: number; name: string; listToDo: Array; isAllDone: boolean})[]}}
   */
  createDb() {
    const toDoManager = [
      {id : 0, name : 'Shopping list', listToDo : [
        { id : 0, task : 'Coffee', IsCompleted: false },
        { id : 1, task : 'Tomato', IsCompleted: true },
        { id : 2, task : 'Bacon', IsCompleted: false}
        ],
        isAllDone: false
      },
      {id : 1, name : 'Party list', listToDo : [
        { id : 0, task : 'Wine', IsCompleted: true },
        { id : 1, task : 'Invite', IsCompleted: true },
        { id : 2, task : 'Pizza', IsCompleted: true}
      ],
        isAllDone: true
      },
      {id : 2, name : 'Holiday', listToDo : [], isAllDone: false}
    ];

    return {toDoManager};
  }
}
