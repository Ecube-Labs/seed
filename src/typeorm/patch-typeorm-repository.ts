import { Repository } from 'typeorm';
import { TypeOrmRepository } from './type-orm-repository';

// typeorm의 원래 Repository를 seed의 `TypeOrmRepository`로 몽키 패치
// code from typeorm-transactional-cls-hooked
export const patchTypeORMRepositoryWithContext = () => {
    Object.getOwnPropertyNames(TypeOrmRepository.prototype).forEach((pName) =>
        Object.defineProperty(
            Repository.prototype,
            pName,
            Object.getOwnPropertyDescriptor(
                Repository.prototype,
                pName,
            ) as PropertyDescriptor,
        ),
    );
};
