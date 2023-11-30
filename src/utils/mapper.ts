import type { DomainEntity, DtoEntity, OrmEntity } from "./entity.js"

export abstract class Mapper {
  abstract toPersistence(domainEntity: DomainEntity): OrmEntity

  abstract toDomainFromOrm(ormEntity: OrmEntity): DomainEntity

  abstract toDomainFromDto(dtoEntity: DtoEntity): DomainEntity

  abstract toDTO(domainEntity: DomainEntity): DtoEntity
}
