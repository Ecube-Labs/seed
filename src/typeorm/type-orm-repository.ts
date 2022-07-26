import { EntityManager, ObjectType, EntityNotFoundError, In } from "typeorm"
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
    const [entity] = await this.findByIds([id]);
    if (!entity) {
      throw new EntityNotFoundError(this.entityClass, id);
    }
    return entity;
  }

  /**
   * @param ids
   */
  async findByIds(ids: ID[]): Promise<T[]> {
    const primaryColumns = this.entityManager.connection.getMetadata(this.entityClass).columns.filter(column => column.isPrimary)
    if (primaryColumns.length !== 1) {
      throw new Error(`Not supported: there should be only one primary column on aggregate root, but ${primaryColumns.length} columns are found.`)
    }

    const primaryColumnPropertyName = primaryColumns[0].propertyName
    // @ts-expect-error
    return this.entityManager.findBy(this.entityClass, {
      [primaryColumnPropertyName]: In(ids)
    })
  }
}
