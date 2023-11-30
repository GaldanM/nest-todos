import { Injectable } from "@nestjs/common"
import { TodoRepository } from "../../infrastructure/database/todo.repository.js"
import type { TodoDomain } from "../entities/todo.domain.js"

@Injectable()
export class GetTodoQuery {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id: string): Promise<TodoDomain | null> {
    return this.todoRepository.findOneById(id)
  }
}
