import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ListToDo} from '../list-toDo';
import {ToDoService} from '../to-do.service';
import {ToDo} from '../to-do';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  // providers: [ToDoService]
})
export class FooterComponent implements OnInit {

  /**
   * @property {ListToDo} list: The list to get info on
   */

  selectedList: ListToDo;
  subscription: Subscription;

  /**
   * Default constructor of the footer
   * @constructor
   */
  constructor(private todoService: ToDoService) {
    this.subscription = this.todoService.getSelectedList()
      .subscribe(list => {this.selectedList = list; console.log('footer list res');
      console.log(list); console.log('footer subscription'); console.log(this.subscription); });
    console.log(this.subscription);
    console.log(this.selectedList);
  }
  ngOnInit() {
  }

  /**
   * Count the number of todo that is not done yet from "list" todos
   * @return {number} : The number of todo not done yet
   */
  countNotDone(): number {
    let n = 0;
    for (let i = 0 ; i < this.selectedList.listToDo.length; i++ ) {
      if (this.selectedList.listToDo[i].IsCompleted === false) {
        n++;
      }
    }
    return n;
  }

  /**
   * Compute the percentage of done todos of "list" todos
   * @return {number}: The percentage of done todos
   */
  percentDone(): number { // return percentage of done todo
    const n: number = this.selectedList.listToDo.length;
    if (n !== 0) {
      const res: number = 1 - this.countNotDone() / n;
      return Number(res.toFixed(2)) * 100;  // round to the 2nd decimal
      // return (1 - this.countNotDone() / n) * 100;
    }
  }
}
