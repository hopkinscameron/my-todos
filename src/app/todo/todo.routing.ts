import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoComponent } from './todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  {
    path: '', component: TodoComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'todo-list' },
      { path: 'todo-list', component: TodoListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TodoRoutingModule { }
