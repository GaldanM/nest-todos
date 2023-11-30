import { Inject, Injectable } from "@nestjs/common"
import type { Todo } from "../../entities/todo.js"
import { TodoRepository } from "../../ports/repositories/todo.repository.js"

@Injectable()
export class GetTodoUseCase {
  constructor(@Inject(TodoRepository) private readonly todoRepository: TodoRepository) {}

  async execute(id: string): Promise<Todo | null> {
    return this.todoRepository.findOneById(id)
  }
}
