import { Module } from "@nestjs/common"
import { TodoModule } from "./todo/todo.module.js"

@Module({
  imports: [TodoModule],
})
export class AppModule {}
