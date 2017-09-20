import {Component, Input, OnInit} from '@angular/core';
import {ListToDo} from '../list-toDo';
import {ToDoService} from '../to-do.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [ToDoService]

})
export class FooterComponent implements OnInit {

  @Input() list: ListToDo;

  constructor(private todoService: ToDoService) { }

  getLatestData(): void {
    const idList: number = this.list.id;
    this.todoService.getListToDo(idList).then(l => this.list = l);
  }
  ngOnInit() {
   // this.getLatestData();
  }



  countNotDone(): number {
    // console.log('footer list');
    // console.log(this.list);
    // this.getLatestData();
    let n: number = 0;
    for (let i = 0 ; i < this.list.listToDo.length; i++ ) {
      if (this.list.listToDo[i].IsCompleted === false) {
        n++;
      }
    }
    return n;
  }

  printList(): string {
    // console.log(this.list);
    return '';
  }
  percentDone(): number { // return percentage of done todo
    let n: number = this.list.listToDo.length;
    if (n !== 0) {
      let res: number = 1 - this.countNotDone() / n;
      return Number(res.toFixed(2)) * 100;  // round to the 2nd decimal
      // return (1 - this.countNotDone() / n) * 100;
    }
  }
}
