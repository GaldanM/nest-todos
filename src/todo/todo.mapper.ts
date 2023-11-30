import { Injectable } from "@nestjs/common"
import type { Mapper } from "../utils/mapper.js"
import type { TodoDomain } from "./domain/entities/todo.domain.js"
import type { TodoDto } from "./http/dto/todo.dto.js"
import type { TodoOrm } from "./infrastructure/database/todo.orm.js"

@Injectable()
export class TodoMapper implements Mapper {
  toPersistence(todoDomain: TodoDomain): TodoOrm {
    return {
      id: todoDomain.id,
      title: todoDomain.title,
      isCompleted: todoDomain.isCompleted,
      listName: todoDomain.listName,
      updatedAt: todoDomain.updatedAt,
    }
  }

  toDomainFromOrm(todoOrm: TodoOrm): TodoDomain {
    return {
      id: todoOrm.id,
      title: todoOrm.title,
      isCompleted: todoOrm.isCompleted,
      listName: todoOrm.listName,
      updatedAt: todoOrm.updatedAt,
    }
  }

  toDomainFromDto(todoDto: TodoDto): TodoDomain {
    return {
      id: todoDto.id,
      title: todoDto.title,
      isCompleted: todoDto.isCompleted,
      listName: todoDto.listName,
      updatedAt: todoDto.updatedAt,
    }
  }

  toDTO(todoDomain: TodoDomain): TodoDto {
    return {
      id: todoDomain.id,
      title: todoDomain.title,
      isCompleted: todoDomain.isCompleted,
      listName: todoDomain.listName,
      updatedAt: todoDomain.updatedAt,
    }
  }
}
