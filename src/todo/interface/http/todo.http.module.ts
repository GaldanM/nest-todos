import { Module } from "@nestjs/common"
import { TodoApplicationModule } from "../../core/application/todo.application.module.js"
import { TodoModule } from "../../todo.module.js"
import { TodoController } from "./todo.controller.js"

@Module({
  controllers: [TodoController],
  imports: [TodoModule, TodoApplicationModule],
})
export class TodoHttpModule {}
