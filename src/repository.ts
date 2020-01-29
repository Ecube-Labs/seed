import { Inject } from "typedi";
import { Aggregate } from "./aggregate";
import { Context } from "./context";

export abstract class Repository<T extends Aggregate<T>> {
  @Inject()
  protected context!: Context;

  /**
   * @param aggregates
   */
  abstract async save(aggregates: T[]): Promise<void>;
}
