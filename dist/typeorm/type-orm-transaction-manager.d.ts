import { TransactionManager } from "../transaction-manager";
export declare class TypeOrmTransactionManager extends TransactionManager {
    /**
     * @param runInTransaction
     */
    transaction(runInTransaction: () => Promise<void>): Promise<void>;
}
