import { AfterAll, type IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber"
import type { NestExpressApplication } from "@nestjs/platform-express"
import { Test } from "@nestjs/testing"
import { DataSource } from "typeorm"
import { AppModule } from "../src/app.module.js"

const moduleFixture = await Test.createTestingModule({
  imports: [AppModule],
}).compile()
const app = moduleFixture.createNestApplication<NestExpressApplication>()
await app.init()

await app.listen(0)
const appUrl = await app.getUrl()

const typeOrmDataSource = moduleFixture.get<DataSource>(DataSource)

export class CustomWorld extends World {
  response!: Response
  data!: unknown
  dataSource!: DataSource
  appUrl!: string

  constructor(options: IWorldOptions) {
    super(options)

    this.dataSource = typeOrmDataSource
    this.appUrl = appUrl
  }
}

setWorldConstructor(CustomWorld)

AfterAll(async function () {
  await app.close()
})
