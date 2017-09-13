import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToDosComponent } from './to-dos/to-dos.component';
import { TodoDetailUpdateComponent } from './todo-detail-update/todo-detail-update.component';
import { ToDoService } from './to-do.service';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ToDosComponent,
    TodoDetailUpdateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
    // RouterModule.forRoot([
    //   {
    //     path: 'todos',
    //     component: ToDosComponent
    //   }
    // ])
  ],
  providers: [ToDoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
