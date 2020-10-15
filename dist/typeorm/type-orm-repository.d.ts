import { EntityManager } from 'typeorm';
import { Aggregate } from '../aggregate';
import { Repository } from 'typeorm';
import { Context } from '../context';
export declare abstract class TypeOrmRepository<T extends Aggregate<T>> extends Repository<T> {
    protected context: Context;
    private _manager;
    /**
     * @deprecated use `manager`
     */
    protected get entityManager(): EntityManager;
    set manager(manager: EntityManager);
    get manager(): EntityManager;
}
