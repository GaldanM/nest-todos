import { beforeEach, describe, expect, it, type MockInstance, vi } from "vitest"
import type { TodoService } from "../domain/todo.service.js"
import { TodoController } from "./todo.controller.js"

type SpyOf<Fn extends (...args: any[]) => any> = MockInstance<Parameters<Fn>, ReturnType<Fn>>

describe("TodoController", () => {
  let todoController: TodoController
  let todoGetHelloSpy: SpyOf<TodoService["getHello"]>

  beforeEach(async () => {
    const todoService: Partial<TodoService> = {
      getHello: vi.fn(),
    }
    todoController = new TodoController(todoService as TodoService)
    todoGetHelloSpy = vi.spyOn(todoController, "get")
  })

  it("should call the todo service", async () => {
    todoController.get()
    expect(todoGetHelloSpy).toHaveBeenCalled()
  })
})
