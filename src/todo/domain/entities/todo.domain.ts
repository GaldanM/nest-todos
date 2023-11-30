import type { DomainEntity } from "../../../utils/entity.js"

export class TodoDomain implements DomainEntity {
  public readonly id!: string
  public readonly title!: string
  public readonly isCompleted!: boolean
  public readonly listName!: string | null
  public readonly updatedAt!: Date
}
