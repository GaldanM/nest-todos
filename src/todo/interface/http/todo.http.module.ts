import { Module } from "@nestjs/common"
import { TodoModule } from "../../todo.module.js"
import { TodoController } from "./todo.controller.js"

@Module({
  controllers: [TodoController],
  imports: [TodoModule],
})
export class TodoHttpModule {}
