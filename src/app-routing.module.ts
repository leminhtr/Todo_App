import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToDosComponent } from './app/to-dos/to-dos.component';
import {ToDoManagerComponent} from './app/to-do-manager/to-do-manager.component';

const routes: Routes = [
   { path: '', redirectTo: '/toDoManager', pathMatch: 'full' },
  // { path: 'detail/:id', component: TodoDetailUpdateComponent },
  { path: 'toDoManager',     component: ToDoManagerComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

