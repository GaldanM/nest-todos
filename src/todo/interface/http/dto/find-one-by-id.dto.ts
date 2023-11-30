import { z } from "zod"

export const FindOneByIdTodoDtoSchema = z.object({ id: z.string().uuid() })

export type FindOneByIdTodoDto = z.infer<typeof FindOneByIdTodoDtoSchema>
