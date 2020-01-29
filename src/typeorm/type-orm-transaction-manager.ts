import { EntityManager, getManager } from "typeorm";
import { TransactionManager } from "../transaction-manager";

export class TypeOrmTransactionManager extends TransactionManager {
  /**
   * @param runInTransaction
   */
  async transaction(runInTransaction: () => Promise<void>): Promise<void> {
    getManager().transaction(async entityManager => {
      this.context.set(EntityManager, entityManager);
      await runInTransaction();
    });
  }
}
