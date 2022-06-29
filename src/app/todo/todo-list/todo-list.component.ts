import { Component, OnInit } from '@angular/core';
import { TodoModel } from 'src/shared/models/todo.model';

import { ApiService } from '../../api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: TodoModel[] = [];

  constructor(private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.todos = await this.apiService.getTodos();
    } catch (err) {
      console.error(err);
    }
  }
}
