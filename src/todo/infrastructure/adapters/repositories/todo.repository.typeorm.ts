import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import type { Paginated } from "../../../../lib/repository.port.js"
import type { TodoRepository } from "../../../core/application/ports/repositories/todo.repository.js"
import type { Todo } from "../../../core/domain/entities/todo.js"
import { TodoMapper } from "../../../todo.mapper.js"
import { TodoTypeOrm } from "../../entities/todo.typeorm.js"

@Injectable()
export class TodoRepositoryTypeOrm implements TodoRepository {
  constructor(
    @InjectRepository(TodoTypeOrm) private readonly todoOrmRepository: Repository<TodoTypeOrm>,
    private readonly todoMapper: TodoMapper,
  ) {}

  public async insert(todoDomain: Todo): Promise<void> {
    const todoOrm = this.todoMapper.toOrmFromDomain(todoDomain)
    await this.todoOrmRepository.insert(todoOrm)
  }

  public async findAll(): Promise<Todo[]> {
    const todosOrm = await this.todoOrmRepository.find()

    return todosOrm.map(this.todoMapper.toDomainFromOrm)
  }

  public async findAllPaginated(): Promise<Paginated<Todo>> {
    throw new Error("Method not implemented.")
  }
}
