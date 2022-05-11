import { EntityManager } from "typeorm";
import { TransactionManager } from "../transaction-manager";
import { dataSourceMap } from './tokens'

export class TypeOrmTransactionManager extends TransactionManager {
  /**
   * @param runInTransaction
   */
  async transaction(runInTransaction: () => Promise<void>, dataSource = 'default'): Promise<void> {
    const entityManager = this.context.get(dataSourceMap)[dataSource].manager

    await entityManager.transaction(async transactionalEntityManager => {
      this.context.set(EntityManager, transactionalEntityManager);
      await runInTransaction();
      this.context.set(EntityManager, entityManager);
    });
  }
}
