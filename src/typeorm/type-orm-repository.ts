import { EntityManager } from 'typeorm';
import { Inject } from 'typedi';
import { Aggregate } from '../aggregate';
import { Repository } from 'typeorm';
import { Context } from '../context';

export abstract class TypeOrmRepository<
    T extends Aggregate<T>
> extends Repository<T> {
    @Inject()
    protected context!: Context;

    private _manager!: EntityManager;

    /**
     * @deprecated use `manager`
     */
    protected get entityManager(): EntityManager {
        return this.manager;
    }

    // @ts-ignore: TS2611 ; override manager
    set manager(manager: EntityManager) {
        this._manager = manager;
    }

    get manager(): EntityManager {
        if (this.context.has(EntityManager)) {
            return this.context.get(EntityManager);
        }
        return this._manager!;
    }
}
