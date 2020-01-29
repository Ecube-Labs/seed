import { EntityManager, getManager } from "typeorm";
import { Aggregate } from "../aggregate";
import { Repository } from "../repository";

export abstract class TypeOrmRepository<T extends Aggregate<T>> extends Repository<T> {
  /**
   *
   */
  protected get entityManager(): EntityManager {
    if (this.context.has(EntityManager)) {
      return this.context.get(EntityManager);
    }
    return getManager();
  }

  /**
   * @param aggregates
   */
  async save(aggregates: T[]) {
    await this.entityManager.save(aggregates);
  }
}
