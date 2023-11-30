import { beforeAll, describe, expect, it, type MockInstance, vi } from "vitest"
import type { IdGenerator } from "../../ports/id-generator/idGenerator.js"
import type { TodoRepository } from "../../ports/repositories/todo.repository.js"
import { CreateTodoUseCase } from "./create-todo.use-case.js"

type SpyOf<Fn extends (...args: any[]) => any> = MockInstance<Parameters<Fn>, ReturnType<Fn>>

describe("CreateTodoUseCase", () => {
  let useCase: CreateTodoUseCase
  let idGeneratorSpy: SpyOf<IdGenerator<string>["generate"]>
  let todoInsertSpy: SpyOf<TodoRepository["insert"]>

  beforeAll(async () => {
    const idGenerator: Partial<IdGenerator<string>> = {
      generate: vi.fn(),
    }
    const todoRepository: Partial<TodoRepository> = {
      insert: vi.fn(),
    }

    useCase = new CreateTodoUseCase(idGenerator as IdGenerator<string>, todoRepository as TodoRepository)

    idGeneratorSpy = vi.spyOn(idGenerator, "generate")
    todoInsertSpy = vi.spyOn(todoRepository, "insert")
  })

  it("Should create a todo", async () => {
    const todoToCreate = { id: "2", title: "Do this", isCompleted: false }
    idGeneratorSpy.mockReturnValueOnce(todoToCreate.id)

    await useCase.execute(todoToCreate.title)

    expect(idGeneratorSpy).toHaveBeenCalled()
    expect(todoInsertSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: todoToCreate.id,
        props: {
          title: todoToCreate.title,
          isCompleted: todoToCreate.isCompleted,
        },
      }),
    )
  })
})
