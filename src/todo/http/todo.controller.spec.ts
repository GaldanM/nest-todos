import { v4 as uuid } from "uuid"
import { beforeEach, describe, expect, it, type MockInstance, vi } from "vitest"
import type { TodoDomain } from "../domain/entities/todo.domain.js"
import type { GetTodoQuery } from "../domain/query/get-todo.query.js"
import { TodoMapper } from "../todo.mapper.js"
import { TodoController } from "./todo.controller.js"

type SpyOf<Fn extends (...args: any[]) => any> = MockInstance<Parameters<Fn>, ReturnType<Fn>>

describe("TodoController", () => {
  let todoController: TodoController
  let getTodoQuerySpy: SpyOf<GetTodoQuery["execute"]>
  let mapperToDTOSpy: SpyOf<TodoMapper["toDTO"]>

  beforeEach(async () => {
    const getTodoQuery: Partial<GetTodoQuery> = {
      execute: vi.fn(),
    }
    const todoMapper = new TodoMapper()
    todoController = new TodoController(getTodoQuery as GetTodoQuery, todoMapper)

    getTodoQuerySpy = vi.spyOn(getTodoQuery, "execute")
    mapperToDTOSpy = vi.spyOn(todoMapper, "toDTO")
  })

  it("Should find the todo and map it as a DTO", async () => {
    const todoToFind: TodoDomain = {
      id: uuid(),
      title: "Do this",
      isCompleted: false,
      listName: null,
      updatedAt: new Date(),
    }
    getTodoQuerySpy.mockResolvedValueOnce(todoToFind)

    const todoDto = await todoController.findOneById({ id: todoToFind.id })

    expect(todoDto.id).toBe(todoToFind.id)
    expect(getTodoQuerySpy).toHaveBeenCalledWith(todoToFind.id)
    expect(mapperToDTOSpy).toHaveBeenCalled()
  })

  it("Should throw when todo is not found", async () => {
    const unknownTodoId = uuid()
    getTodoQuerySpy.mockResolvedValueOnce(null)

    const promise = todoController.findOneById({ id: unknownTodoId })

    await expect(promise).rejects.toThrowError()
    expect(mapperToDTOSpy).not.toHaveBeenCalled()
  })
})
