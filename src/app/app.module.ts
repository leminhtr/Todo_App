import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ToDosComponent } from './to-dos/to-dos.component';
//import { TodoDetailUpdateComponent } from './todo-detail-update/todo-detail-update.component';
import { ToDoService } from './to-do.service';
import {AppRoutingModule} from '../app-routing.module';
import {HttpModule} from '@angular/http';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    ToDosComponent,
    // TodoDetailUpdateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [ToDoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
