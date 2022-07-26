import { Inject } from "typedi"
import { Context } from "./context"

export abstract class TransactionManager {
  @Inject()
  protected context!: Context

  /**
   * @param runInTransaction
   */
  abstract transaction(runInTransaction: () => Promise<void>, dataSource?: string): Promise<void>
}
