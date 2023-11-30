import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TodoModule } from "../todo.module.js"
import { TodoOrm } from "./database/todo.orm.js"
import { TodoRepository } from "./database/todo.repository.js"

const ormEntities = [TodoOrm]

const repositories = [TodoRepository]

@Module({
  providers: [...repositories],
  imports: [TodoModule, TypeOrmModule.forFeature([...ormEntities])],
  exports: [TypeOrmModule, ...repositories],
})
export class TodoInfrastructureModule {}
