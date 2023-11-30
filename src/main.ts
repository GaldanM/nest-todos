import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module.js"

const app = await NestFactory.create(AppModule)
app.useGlobalPipes(new ValidationPipe())
await app.listen(3000)
console.info("Listening on http://localhost:3000")
