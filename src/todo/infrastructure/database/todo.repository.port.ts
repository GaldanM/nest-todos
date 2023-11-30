import type { RepositoryPort } from "../../../utils/repository.port.js"
import type { TodoDomain } from "../../domain/entities/todo.domain.js"

export interface TodoRepositoryPort extends RepositoryPort<TodoDomain> {}
