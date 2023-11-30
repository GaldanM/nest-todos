import { Module } from "@nestjs/common"
import { TodoService } from "../domain/todo.service.js"
import { TodoController } from "./todo.controller.js"

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoHttpModule {}
