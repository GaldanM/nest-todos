import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { IdGenerator } from "../domain/ports/id-generator/idGenerator.js"
import { TodoRepository } from "../domain/ports/repositories/todo.repository.js"
import { TodoModule } from "../todo.module.js"
import { UUIDGenerator } from "./adapters/id-generator/uuidGenerator.js"
import { TodoRepositoryTypeOrm } from "./adapters/repositories/todo.repository.typeorm.js"
import { TodoTypeOrm } from "./entities/todo.typeorm.js"

const ormEntities = [TodoTypeOrm]

const repositories = [{ provide: TodoRepository, useClass: TodoRepositoryTypeOrm }]
const idGenerators = [{ provide: IdGenerator, useClass: UUIDGenerator }]
const adapters = [...repositories, ...idGenerators]

@Module({
  providers: [...adapters],
  imports: [
    TodoModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DATABASE_URL"),
        port: configService.get("DATABASE_PORT"),
        username: configService.get("DATABASE_USER"),
        password: configService.get("DATABASE_PASSWORD"),
        database: configService.get("DATABASE_NAME"),
        autoLoadEntities: true,
        synchronize: configService.get("ENV") === "development",
        retryAttempts: 0,
        retryDelay: 0,
      }),
    }),
    TypeOrmModule.forFeature(ormEntities),
  ],
  exports: [TypeOrmModule, ...adapters],
})
export class TodoInfrastructureModule {}
