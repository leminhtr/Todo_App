import {Component, Input, OnInit} from '@angular/core';
import {ListToDo} from '../list-toDo';
import {ToDoService} from '../to-do.service';
import {ToDo} from '../to-do';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {

  /**
   * @property {ListToDo} list: The list to get info on
   */
  @Input() list: ListToDo;
  // listTD: ToDo[] = this.list.listToDo;

  /**
   * Default constructor of the footer
   * @constructor
   */
  constructor() { }
  ngOnInit() {
  }


  /**
   * Count the number of todo that is not done yet from "list" todos
   * @return {number} : The number of todo not done yet
   */
  countNotDone(): number {
    let n: number = 0;
    for (let i = 0 ; i < this.list.listToDo.length; i++ ) {
      if (this.list.listToDo[i].IsCompleted === false) {
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
    let n: number = this.list.listToDo.length;
    if (n !== 0) {
      let res: number = 1 - this.countNotDone() / n;
      return Number(res.toFixed(2)) * 100;  // round to the 2nd decimal
      // return (1 - this.countNotDone() / n) * 100;
    }
  }
}
