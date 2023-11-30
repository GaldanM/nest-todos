import { Module } from "@nestjs/common"
import { TodoHttpModule } from "./http/todo.http.module.js"
import { TodoInfrastructureModule } from "./infrastructure/todo.infrastructure.module.js"

@Module({
  imports: [TodoHttpModule, TodoInfrastructureModule],
})
export class TodoModule {}
