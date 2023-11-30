import { Controller, Get, NotFoundException, Param } from "@nestjs/common"
import { GetTodoQuery } from "../domain/query/get-todo.query.js"
import { TodoMapper } from "../todo.mapper.js"
import type { FindOneByIdTodoDto } from "./dto/find-one-by-id.dto.js"
import type { TodoDto } from "./dto/todo.dto.js"

@Controller("todos")
export class TodoController {
  constructor(
    private readonly getTodoQuery: GetTodoQuery,
    private readonly todoMapper: TodoMapper,
  ) {}

  @Get(":id")
  async findOneById(@Param() { id: todoId }: FindOneByIdTodoDto): Promise<TodoDto> {
    const todoDomain = await this.getTodoQuery.execute(todoId)

    if (!todoDomain) {
      throw new NotFoundException()
    }

    return this.todoMapper.toDTO(todoDomain)
  }
}
