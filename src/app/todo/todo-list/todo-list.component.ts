import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { TodoModel } from 'src/shared/models/todo.model';
import { ApiService } from '../../api.service';

interface TodoTableModel extends TodoModel {
  isUpdating: boolean;
  isOverdue: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  loading = true;
  todoList: TodoTableModel[] = [];

  private todos: TodoModel[] = [];

  constructor(private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.todos = await this.apiService.getTodos();
      this.todos = this.todos.map((todo, index) => {
        const random = Math.random();
        todo.isComplete = random < 0.5;
        todo.dueDate = random < 0.25 ? undefined : todo.dueDate;
        return todo;
      });
      this.todoList = this.getTodoListModels(this.todos);
      this.todoList = this.orderTodos(this.todoList);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async updateTodo(todo: TodoTableModel): Promise<void> {
    if (!todo) {
      return;
    }

    try {
      todo.isUpdating = true;
      todo.isComplete = await this.apiService.updateTodo(todo.id);
      todo.isOverdue = this.isOverDue(todo);
      this.todoList = this.orderTodos(this.todoList);
    } catch (err) {
      console.error(err);
    } finally {
      todo.isUpdating = false;
    }
  }

  private getTodoListModels(todos: TodoModel[]): TodoTableModel[] {
    return todos.map((todo) => {
      return {
        ...todo,
        isUpdating: false,
        isOverdue: this.isOverDue(todo),
      };
    });
  }

  private isOverDue(todo: TodoModel | TodoTableModel): boolean {
    return !todo.isComplete && moment().diff(moment(todo.dueDate)) > 0;
  }

  private orderTodos(todos: TodoTableModel[]): TodoTableModel[] {
    return todos.sort((todoA, todoB) => {
      const dateA = todoA.dueDate ? new Date(todoA.dueDate).getTime() : 0;
      const dateB = todoB.dueDate ? new Date(todoB.dueDate).getTime() : 0;

      if ((todoA.isOverdue && todoB.isOverdue) || (todoA.isComplete && todoB.isComplete)) {
        if (!dateA && dateB) {
          return 1;
        }

        if (dateA && !dateB) {
          return -1;
        }

        return (dateA > dateB) ? 1 : ((dateB > dateA) ? -1 : 0);
      }

      if ((todoA.isOverdue && !todoB.isOverdue) || (!todoA.isOverdue && !todoA.isComplete && todoB.isComplete)) {
        return -1;
      }

      return 1;
    });
  }
}
