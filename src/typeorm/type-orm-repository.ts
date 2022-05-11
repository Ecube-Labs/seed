import { EntityManager, ObjectType } from "typeorm"
import { Aggregate } from "../aggregate"
import { Repository } from "../repository"
import { dataSourceMap } from './tokens'

export abstract class TypeOrmRepository<T extends Aggregate<T>, ID> extends Repository<T, ID> {
  protected abstract entityClass: ObjectType<T>
  protected connectionName?: string

  /**
   *
   */
  protected get entityManager(): EntityManager {
    if (this.context.has(EntityManager)) {
      return this.context.get(EntityManager)
    }
    return this.context.get(dataSourceMap)[this.connectionName ?? 'default'].manager
  }

  /**
   * @param aggregates
   */
  async save(aggregates: T[]) {
    await this.entityManager.save(aggregates)
  }

  /**
   * @param id
   */
  async findOneOrFail(id: ID): Promise<T> {
    return this.entityManager.findOneByOrFail(this.entityClass, id)
  }

  /**
   * @param ids
   */
  async findByIds(ids: ID[]): Promise<T[]> {
    return this.entityManager.findByIds(this.entityClass, ids)
  }
}
