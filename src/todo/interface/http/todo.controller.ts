import { Body, Controller, Get, HttpCode, Inject, NotFoundException, Param, Post } from "@nestjs/common"
import { ZodPipe } from "../../../zod.pipe.js"
import { CreateTodoUseCase } from "../../core/application/use-cases/create-todo/create-todo.use-case.js"
import { GetTodoUseCase } from "../../core/application/use-cases/get-todo/get-todo.use-case.js"
import { TodoMapper } from "../../todo.mapper.js"
import { type CreateTodoDto, CreateTodoDtoSchema } from "./dto/create-todo.dto.js"
import { type FindOneByIdTodoDto, FindOneByIdTodoDtoSchema } from "./dto/find-one-by-id.dto.js"
import type { TodoDto } from "./dto/todo.dto.js"

@Controller("todos")
export class TodoController {
  constructor(
    @Inject(TodoMapper) private readonly todoMapper: TodoMapper,
    @Inject(GetTodoUseCase) private readonly getTodo: GetTodoUseCase,
    @Inject(CreateTodoUseCase) private readonly createTodo: CreateTodoUseCase,
  ) {}

  @Get(":id")
  async findOneById(@Param(new ZodPipe(FindOneByIdTodoDtoSchema)) params: FindOneByIdTodoDto): Promise<TodoDto> {
    const todoDomain = await this.getTodo.execute(params.id)

    if (!todoDomain) {
      throw new NotFoundException()
    }

    return this.todoMapper.toDTOFromDomain(todoDomain)
  }

  @Post()
  @HttpCode(201)
  async createOne(@Body(new ZodPipe(CreateTodoDtoSchema)) body: CreateTodoDto): Promise<TodoDto> {
    const todoDomain = await this.createTodo.execute(body.title)
    return this.todoMapper.toDTOFromDomain(todoDomain)
  }
}
