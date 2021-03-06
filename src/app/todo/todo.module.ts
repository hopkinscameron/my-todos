import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderModule } from 'src/shared/loader/loader.module';
import { EmptyStateModule } from 'src/shared/empty-state/empty-state.module';
import { MaterialModule } from 'src/shared/modules/material.module';
import { TodoRoutingModule } from './todo.routing';
import { TodoComponent } from './todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TodoRoutingModule,
    LoaderModule,
    EmptyStateModule,
  ],
})
export class TodoModule { }
