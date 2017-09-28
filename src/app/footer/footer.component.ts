import {Component, Input, OnInit} from '@angular/core';
import {ListToDo} from '../list-toDo';
import {ToDoService} from '../to-do.service';
import {ToDo} from '../to-do';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {

  /**
   * @property {ListToDo} selectedList: The list to get info on
   */
  selectedList: ListToDo;

  /**
   * @property {Subscription} subscription: Subscription object to get the list from the observable
   */
  subscription: Subscription;

  /**
   * Constructor of the footer
   * Get selected list from Observable
   * @constructor
   */
  constructor(private todoService: ToDoService) {
    this.subscription = this.todoService.getSelectedList()
      .subscribe(list => {this.selectedList = list; });
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
  }

  //  private handleError(error: any): Promise<any> {
//   console.error('An error occurred', error); // for demo purposes only
//   return Promise.reject(error.message || error);
// }
  /**
   * Handle division by zero
   */
  private handleDivideZero() {
    console.error('Error: Attempt to divide by zero');
  }

  /**
   * Handle division by negative number
   * The number of (not) done todos is never negative.
   */
  private handleDivideNegative() {
    console.error('Error: Attempt to divide by negative number');
  }

  /**
   * Count the number of todo that is not done yet from "list" todos
   * @return {number} : The number of todo not done yet
   */
  countNotDone(): number {
    let numberOfNotDoneToDos = 0;
    const totalNumberOfToDos: number = this.selectedList.listToDo.length;

    for (let i = 0 ; i < totalNumberOfToDos; i++ ) {
      if (this.selectedList.listToDo[i].IsCompleted === false) {
        numberOfNotDoneToDos++;
      }
    }
    return numberOfNotDoneToDos;
  }

  /**
   * Compute the percentage of done todos of "list" todos
   * @return {number}: The percentage of done todos
   */
  percentDone(): number { // return percentage of done todo
    const totalNumberOfToDos: number = this.selectedList.listToDo.length;
    if (totalNumberOfToDos === 0 ) {
      this.handleDivideZero();
    } else
    if (totalNumberOfToDos < 0) {
      this.handleDivideNegative();
    } else {
      const numberOfDoneToDos: number = 1 - (this.countNotDone() / totalNumberOfToDos);
      return Number(numberOfDoneToDos.toFixed(2)) * 100;  // round to the 2nd decimal
    }
  }
}
