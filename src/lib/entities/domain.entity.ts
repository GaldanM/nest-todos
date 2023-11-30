import type { z } from "zod"

export type ID = string

interface CreateEntityProps<T> {
  id: ID
  props: T
}

export abstract class DomainEntity<EntityProps> {
  public readonly id: ID
  protected readonly props: EntityProps
  protected readonly validationSchema: z.ZodType<EntityProps>

  public constructor({ id, props }: CreateEntityProps<EntityProps>, validationSchema: z.ZodType<EntityProps>) {
    this.id = id
    this.props = props
    this.validationSchema = validationSchema
    this.validate()
  }

  protected validate() {
    this.validationSchema.parse(this.props)
  }
}
