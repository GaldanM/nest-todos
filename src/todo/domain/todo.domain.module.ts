import { Module } from "@nestjs/common"
import { TodoService } from "./todo.service.js"

@Module({
  providers: [TodoService],
})
export class TodoDomainModule {}
