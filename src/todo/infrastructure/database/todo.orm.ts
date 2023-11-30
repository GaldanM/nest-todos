import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import type { OrmEntity } from "../../../utils/entity.js"

@Entity()
export class TodoOrm implements OrmEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string

  @Column("text")
  public title!: string

  @Column({ type: "boolean", default: false })
  public isCompleted!: boolean

  @Column({ type: "text", nullable: true })
  public listName!: string | null

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  public updatedAt!: Date
}
