import type { DtoEntity } from "../../../utils/entity.js"

export class TodoDto implements DtoEntity {
  public readonly id!: string
  public readonly title!: string
  public readonly isCompleted!: boolean
  public readonly listName!: string | null
  public readonly updatedAt!: Date
}
