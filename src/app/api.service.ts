import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TodoModel } from '../shared/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly mockUrl = 'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/';
  private readonly headers: HeadersInit = {
    'X-API-KEY': 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  constructor (private router: Router) { }

  async getTodos(): Promise<TodoModel[]> {
    const response = await fetch(`${this.mockUrl}get`, {
      method: 'GET',
      headers: this.headers,
    });
    return this.validatedResponse(response);
  }

  async updateTodo(todoId: number): Promise<boolean> {
    const response = await fetch(`${this.mockUrl}patch/${todoId}`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ isComplete: true }),
      });

    return (await this.validatedResponse(response)).status === 'success';
  }

  private async validatedResponse(response: Response): Promise<any> {
    const status = response.status;
    if (status === 404) {
      this.router.navigate(['errors/404']);
      return null;
    }

    if (status === 401 || status === 403) {
      this.router.navigate(['errors/403']);
      return null;
    }

    return response.json();
  }
}
