import { Module, type Provider } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ID_GENERATOR_TOKEN } from "../core/application/ports/id-generator/id-generator.js"
import { TodoRepository } from "../core/application/ports/repositories/todo.repository.js"
import { TodoModule } from "../todo.module.js"
import { UUIDGenerator } from "./adapters/id-generator/uuid-generator.js"
import { TodoRepositoryTypeOrm } from "./adapters/repositories/todo.repository.typeorm.js"
import { TodoTypeOrm } from "./entities/todo.typeorm.js"

const ormEntities = [TodoTypeOrm]

const repositories: Provider[] = [{ provide: TodoRepository, useClass: TodoRepositoryTypeOrm }]
const idGenerators: Provider[] = [{ provide: ID_GENERATOR_TOKEN, useValue: UUIDGenerator }]
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
