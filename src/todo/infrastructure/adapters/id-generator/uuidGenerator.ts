import { v4 as uuid } from "uuid"
import type { IdGenerator } from "../../../domain/ports/id-generator/idGenerator.js"

export class UUIDGenerator implements IdGenerator {
  generate(): string {
    return uuid()
  }
}
