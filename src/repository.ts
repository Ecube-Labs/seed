import { Inject } from "typedi";
import { Aggregate } from "./aggregate";
import { Context } from "./context";

export abstract class Repository<T extends Aggregate<T>, ID> {
  @Inject()
  protected context!: Context;

  /**
   * @param aggregates
   */
  abstract async save(aggregates: T[]): Promise<void>;

  /**
   * @param id
   */
  abstract async findOneOrFail(id: ID): Promise<T>;

  /**
   * @param ids
   */
  abstract async findByIds(ids: ID[]): Promise<T[]>;
}
