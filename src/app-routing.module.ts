import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './app/dashboard/dashboard.component';
import { ToDosComponent } from './app/to-dos/to-dos.component';
import { TodoDetailUpdateComponent } from './app/todo-detail-update/todo-detail-update.component';

const routes: Routes = [
   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: TodoDetailUpdateComponent },
  { path: 'ToDos',     component: ToDosComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

