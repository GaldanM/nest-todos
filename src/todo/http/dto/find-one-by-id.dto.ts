import { IsUUID } from "class-validator"

export class FindOneByIdTodoDto {
  @IsUUID()
  public id!: string
}
