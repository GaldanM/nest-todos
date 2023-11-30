import { Controller, Get } from "@nestjs/common"
import { TodoService } from "../domain/todo.service.js"

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  get(): string {
    return this.todoService.getHello()
  }
}
