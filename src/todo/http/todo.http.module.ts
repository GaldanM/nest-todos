import { Module } from "@nestjs/common"
import { TodoDomainModule } from "../domain/todo.domain.module.js"
import { TodoModule } from "../todo.module.js"
import { TodoController } from "./todo.controller.js"

@Module({
  controllers: [TodoController],
  imports: [TodoModule, TodoDomainModule],
})
export class TodoHttpModule {}
