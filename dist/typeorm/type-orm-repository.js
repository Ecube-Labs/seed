"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var typedi_1 = require("typedi");
var typeorm_2 = require("typeorm");
var context_1 = require("../context");
var TypeOrmRepository = /** @class */ (function (_super) {
    __extends(TypeOrmRepository, _super);
    function TypeOrmRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TypeOrmRepository.prototype, "entityManager", {
        /**
         * @deprecated use `manager`
         */
        get: function () {
            return this.manager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeOrmRepository.prototype, "manager", {
        get: function () {
            if (this.context.has(typeorm_1.EntityManager)) {
                return this.context.get(typeorm_1.EntityManager);
            }
            return this._manager;
        },
        // @ts-ignore: TS2611 ; override manager
        set: function (manager) {
            this._manager = manager;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", context_1.Context)
    ], TypeOrmRepository.prototype, "context", void 0);
    return TypeOrmRepository;
}(typeorm_2.Repository));
exports.TypeOrmRepository = TypeOrmRepository;
