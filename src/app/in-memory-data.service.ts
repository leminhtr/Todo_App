import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const toDoManagerData = [
      {id : 1, name : 'Shopping list', listToDo : [
        { id : 1, task : 'Coffee', IsCompleted: false },
        { id : 2, task : 'Tomato', IsCompleted: true },
        { id : 3, task : 'Bacon', IsCompleted: false}
        ],
        isAllDone: false
      },
      {id : 2, name : 'Party list', listToDo : [
        { id : 1, task : 'Wine', IsCompleted: true },
        { id : 2, task : 'Invite', IsCompleted: true },
        { id : 3, task : 'Pizza', IsCompleted: true}
      ],
        isAllDone: true
      },
      {id : 3, name : 'Holiday', listToDo : [], isAllDone: false}
    ];

    return {toDoManagerData};
  }
}
