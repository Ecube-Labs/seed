import { EntityManager, ObjectType, EntityNotFoundError, In } from "typeorm";
import { Aggregate } from "../aggregate";
import { Repository } from "../repository";
import { dataSourceMap } from "./tokens";

export abstract class TypeOrmRepository<
  T extends Aggregate<T>,
  ID
> extends Repository<T, ID> {
  protected abstract entityClass: ObjectType<T>;
  protected connectionName?: string;

  /**
   *
   */
  protected get entityManager(): EntityManager {
    if (this.context.has(EntityManager)) {
      return this.context.get(EntityManager);
    }
    return this.context.get(dataSourceMap)[this.connectionName ?? "default"]
      .manager;
  }

  /**
   * @param aggregates
   */
  async save(aggregates: T[]) {
    await this.entityManager.save(aggregates);
  }

  /**
   * @param id
   * @param options
   */
  async findOneOrFail(
    id: ID,
    options?: {
      lock: {
        mode: "pessimistic_read" | "pessimistic_write";
        withDeleted?: boolean;
      };
    }
  ): Promise<T> {
    const [entity] = await this.findByIds([id], options);
    if (!entity) {
      throw new EntityNotFoundError(this.entityClass, id);
    }
    return entity;
  }

  /**
   * @param ids
   * @param options
   */
  async findByIds(
    ids: ID[],
    options?: {
      lock: {
        mode: "pessimistic_read" | "pessimistic_write";
        withDeleted?: boolean;
      };
    }
  ): Promise<T[]> {
    const primaryColumns = this.entityManager.connection
      .getMetadata(this.entityClass)
      .columns.filter((column) => column.isPrimary);
    if (primaryColumns.length !== 1) {
      throw new Error(
        `Not supported: there should be only one primary column on aggregate root, but ${primaryColumns.length} columns are found.`
      );
    }

    const primaryColumnPropertyName = primaryColumns[0].propertyName;
    return this.entityManager.find(this.entityClass, {
      // @ts-expect-error Entity 의 property 중 하나에 @PrimaryColumn() 에 있는지 위에서 검사하기 때문에 where: { [primaryColumnPropertyName]: In(ids) } 은 FindOptionsWhere<T> 타입
      where: { [primaryColumnPropertyName]: In(ids) },
      ...options,
    });
  }
}
