import { EntityManager, getManager, ObjectType } from "typeorm";
import { Aggregate } from "../aggregate";
import { Repository } from "../repository";

export abstract class TypeOrmRepository<T extends Aggregate<T>, ID> extends Repository<T, ID> {
  protected abstract entityClass: ObjectType<T>;
  protected abstract connectionName?: string;

  /**
   *
   */
  protected get entityManager(): EntityManager {
    if (this.context.has(EntityManager)) {
      return this.context.get(EntityManager);
    }
    return getManager(this.connectionName);
  }

  /**
   * @param aggregates
   */
  async save(aggregates: T[]) {
    await this.entityManager.save(aggregates);
  }

  /**
   * @param id
   */
  async findOneOrFail(id: ID): Promise<T> {
    return this.entityManager.findOneOrFail(this.entityClass, id);
  }

  /**
   * @param ids
   */
  async findByIds(ids: ID[]): Promise<T[]> {
    return this.entityManager.findByIds(this.entityClass, ids);
  }
}
