import { InMemoryDbService } from 'angular-in-memory-web-api';
import {ToDo} from './to-do';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const TODOS: ToDo[] = [
      { id: 1, task: 'cooking', IsCompleted: true },
      { id: 2, task: 'sorting', IsCompleted: false },
      { id: 3, task: 'cleaning', IsCompleted: true },
      { id: 4, task: 'working', IsCompleted: false }
    ];
    return {TODOS};
  }
}
