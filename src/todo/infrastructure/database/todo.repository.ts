import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import type { Paginated } from "../../../utils/repository.port.js"
import type { TodoDomain } from "../../domain/entities/todo.domain.js"
import { TodoMapper } from "../../todo.mapper.js"
import { TodoOrm } from "./todo.orm.js"
import type { TodoRepositoryPort } from "./todo.repository.port.js"

@Injectable()
export class TodoRepository implements TodoRepositoryPort {
  constructor(
    @InjectRepository(TodoOrm) private readonly todoRepository: Repository<TodoOrm>,
    private readonly todoMapper: TodoMapper,
  ) {}

  public async findAll(): Promise<TodoDomain[]> {
    return []
  }

  public async findAllPaginated(): Promise<Paginated<TodoDomain>> {
    return {
      count: 0,
      limit: 0,
      page: 0,
      data: [],
    }
  }

  public async findOneById(id: string): Promise<TodoDomain | null> {
    const todoOrm = await this.todoRepository.findOne({ where: { id } })

    if (!todoOrm) {
      return null
    }

    return this.todoMapper.toDomainFromOrm(todoOrm)
  }

  public async insert(): Promise<void> {
    return
  }

  public async delete(): Promise<boolean> {
    return false
  }
}
