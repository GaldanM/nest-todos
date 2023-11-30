import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TodoHttpModule } from "./todo/http/todo.http.module.js"

@Module({
  imports: [
    TodoHttpModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "admin",
      password: "admin",
      database: "postgres",
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
