import { Aggregate } from "./aggregate";
import { Context } from "./context";
export declare abstract class Repository<T extends Aggregate<T>> {
    protected context: Context;
    /**
     * @param aggregates
     */
    abstract save(aggregates: T[]): Promise<void>;
}
