import { beforeEach, describe, expect, it } from "vitest"
import { TodoService } from "./todo.service.js"

describe("TodoService", () => {
  let todoService: TodoService

  beforeEach(async () => {
    todoService = new TodoService()
  })

  it('should return "Hello World!"', async () => {
    const result = todoService.getHello()

    expect(result).toBe("Hello World!")
  })
})
