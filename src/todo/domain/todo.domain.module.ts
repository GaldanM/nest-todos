import { Module } from "@nestjs/common"
import { TodoInfrastructureModule } from "../infrastructure/todo.infrastructure.module.js"
import { GetTodoQuery } from "./query/get-todo.query.js"

const queries = [GetTodoQuery]

@Module({
  providers: [...queries],
  imports: [TodoInfrastructureModule],
  exports: [...queries],
})
export class TodoDomainModule {}
