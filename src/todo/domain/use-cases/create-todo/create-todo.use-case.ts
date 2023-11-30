import { Inject, Injectable } from "@nestjs/common"
import { Todo } from "../../entities/todo.js"
import { IdGenerator } from "../../ports/id-generator/idGenerator.js"
import { TodoRepository } from "../../ports/repositories/todo.repository.js"

@Injectable()
export class CreateTodoUseCase {
  constructor(
    @Inject(IdGenerator) private readonly idGenerator: IdGenerator,
    @Inject(TodoRepository) private readonly todoRepository: TodoRepository,
  ) {}

  async execute(title: string) {
    const id = this.idGenerator.generate()
    const newTodo = Todo.create({ id, title })
    await this.todoRepository.insert(newTodo)
    return newTodo
  }
}
