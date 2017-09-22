import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const toDoManager = [
      {id : 0, name : 'Holiday', listToDo : [], isAllDone: false},
    ];

    return {toDoManager};
  }
}
