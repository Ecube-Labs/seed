import { Inject } from "typedi";
import { Context } from "./context";

export abstract class TransactionManager {
  @Inject()
  protected context!: Context;

  /**
   * @param runInTransaction
   */
  abstract async transaction(runInTransaction: () => Promise<void>): Promise<void>;
}
