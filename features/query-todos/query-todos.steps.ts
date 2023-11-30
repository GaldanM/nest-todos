import { AfterAll, Before, Given, type IWorldOptions, setWorldConstructor, Then, When, World } from "@cucumber/cucumber"
import type { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import chai, { expect } from "chai"
import chaiHttp from "chai-http"
import { AppModule } from "../../src/app.module.js"
import type { TodoDomain } from "../../src/todo/domain/entities/todo.domain.js"

chai.use(chaiHttp)
const request = chai.request

const moduleFixture = await Test.createTestingModule({
  imports: [AppModule],
}).compile()
const app = moduleFixture.createNestApplication()
await app.init()

class CustomWorld extends World {
  app!: INestApplication
  todos!: TodoDomain[]
  response!: ChaiHttp.Response

  constructor(options: IWorldOptions) {
    super(options)
  }
}

setWorldConstructor(CustomWorld)

Before(function (this: CustomWorld) {
  this.todos = []
})

Given("the system has todos", function (this: CustomWorld) {
  this.todos = [
    { id: "1", title: "todo 1", isCompleted: false, listName: null, updatedAt: new Date() },
    { id: "2", title: "todo 2", isCompleted: false, listName: null, updatedAt: new Date() },
  ]
})

When("the user requests the todo with id {string}", async function (this: CustomWorld, todoId: string) {
  this.response = await request(app.getHttpServer()).get(`/todos/${todoId}`)
  // this.result = {
  //   count: this.todos.length,
  //   page: 1,
  //   data: this.todos,
  //   next: false,
  // }
  console.log(this.response)
})

Then("the system should return the todo", function (this: CustomWorld) {
  expect(this.response.statusCode).equal(404)
})

AfterAll(async function () {
  await app.close()
})
