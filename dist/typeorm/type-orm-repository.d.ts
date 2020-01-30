import { EntityManager } from "typeorm";
import { Aggregate } from "../aggregate";
import { Repository } from "../repository";
export declare abstract class TypeOrmRepository<T extends Aggregate<T>> extends Repository<T> {
    /**
     *
     */
    protected get entityManager(): EntityManager;
    /**
     * @param aggregates
     */
    save(aggregates: T[]): Promise<void>;
}
