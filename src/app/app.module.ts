import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToDosComponent } from './to-dos/to-dos.component';
import { TodoDetailUpdateComponent } from './todo-detail-update/todo-detail-update.component';
import { ToDoService } from './to-do.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ToDosComponent,
    TodoDetailUpdateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ToDoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
