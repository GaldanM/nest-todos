import { Module } from "@nestjs/common"
import { TodoInfrastructureModule } from "../../infrastructure/todo.infrastructure.module.js"
import { CreateTodoUseCase } from "./use-cases/create-todo/create-todo.use-case.js"
import { GetTodoUseCase } from "./use-cases/get-todo/get-todo.use-case.js"

const useCases = [GetTodoUseCase, CreateTodoUseCase]

@Module({
  providers: [...useCases],
  imports: [TodoInfrastructureModule],
  exports: [...useCases],
})
export class TodoApplicationModule {}
