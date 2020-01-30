import { Context } from "./context";
export declare abstract class TransactionManager {
    protected context: Context;
    /**
     * @param runInTransaction
     */
    abstract transaction(runInTransaction: () => Promise<void>): Promise<void>;
}
