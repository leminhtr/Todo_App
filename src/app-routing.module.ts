import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToDosComponent } from './app/to-dos/to-dos.component';
import { TodoDetailUpdateComponent } from './app/todo-detail-update/todo-detail-update.component';

const routes: Routes = [
   { path: '', redirectTo: '/ToDos', pathMatch: 'full' },
  { path: 'detail/:id', component: TodoDetailUpdateComponent },
  { path: 'ToDos',     component: ToDosComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

