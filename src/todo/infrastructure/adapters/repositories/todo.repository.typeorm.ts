import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import type { Paginated } from "../../../../lib/repository.port.js"
import type { Todo } from "../../../domain/entities/todo.js"
import type { TodoRepository } from "../../../domain/ports/repositories/todo.repository.js"
import { TodoMapper } from "../../../todo.mapper.js"
import { TodoTypeOrm } from "../../entities/todo.typeorm.js"

@Injectable()
export class TodoRepositoryTypeOrm implements TodoRepository {
  constructor(
    @InjectRepository(TodoTypeOrm) private readonly todoOrmRepository: Repository<TodoTypeOrm>,
    private readonly todoMapper: TodoMapper,
  ) {}

  public async findAll(): Promise<Todo[]> {
    throw new Error("Method not implemented.")
  }

  public async findAllPaginated(): Promise<Paginated<Todo>> {
    throw new Error("Method not implemented.")
  }

  public async findOneById(): Promise<Todo | null> {
    throw new Error("Method not implemented.")
    // const todoOrm = await this.todoOrmRepository.findOne({ where: { id } })
    //
    // if (!todoOrm) {
    //   return null
    // }
    //
    // return this.todoMapper.toDomainFromOrm(todoOrm)
  }

  public async insert(todoDomain: Todo): Promise<void> {
    const todoOrm = this.todoMapper.toOrmFromDomain(todoDomain)
    await this.todoOrmRepository.insert(todoOrm)
  }

  public async delete(): Promise<boolean> {
    throw new Error("Method not implemented.")
  }
}
