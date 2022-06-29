import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoModule } from './todo/todo.module';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'todo',
        loadChildren: (): Promise<TodoModule> => import('./todo/todo.module').then(mod => mod.TodoModule),
      },
      { path: '', pathMatch: 'full', redirectTo: 'todo' },
      { path: 'errors/403', component: UnauthorizedComponent },
      { path: 'errors/404', component: NotFoundComponent },
      { path: '**', redirectTo: 'errors/404' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
