"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var type_orm_repository_1 = require("./type-orm-repository");
// typeorm의 원래 Repository를 seed의 `TypeOrmRepository`로 몽키 패치
// code from typeorm-transactional-cls-hooked
exports.patchTypeORMRepositoryWithContext = function () {
    Object.getOwnPropertyNames(type_orm_repository_1.TypeOrmRepository.prototype).forEach(function (pName) {
        return Object.defineProperty(typeorm_1.Repository.prototype, pName, Object.getOwnPropertyDescriptor(typeorm_1.Repository.prototype, pName));
    });
};
