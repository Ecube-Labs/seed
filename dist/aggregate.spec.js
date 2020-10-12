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
var aggregate_1 = require("./aggregate");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        return _this;
    }
    __decorate([
        aggregate_1.Identifier(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    return User;
}(aggregate_1.Aggregate));
var Team = /** @class */ (function (_super) {
    __extends(Team, _super);
    function Team(id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        return _this;
    }
    __decorate([
        aggregate_1.Identifier(),
        __metadata("design:type", String)
    ], Team.prototype, "id", void 0);
    return Team;
}(aggregate_1.Aggregate));
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.iPhone = "iPhone";
        _this.headPhoneJackCount = 0;
        return _this;
    }
    __decorate([
        aggregate_1.Property(),
        __metadata("design:type", Object)
    ], Apple.prototype, "iPhone", void 0);
    __decorate([
        aggregate_1.Property(),
        __metadata("design:type", String)
    ], Apple.prototype, "airPower", void 0);
    __decorate([
        aggregate_1.Property(),
        __metadata("design:type", Object)
    ], Apple.prototype, "headPhoneJackCount", void 0);
    return Apple;
}(aggregate_1.Aggregate));
var Animal = /** @class */ (function (_super) {
    __extends(Animal, _super);
    function Animal(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    Animal.prototype.getClasses = function () {
        return [Animal, Cat];
    };
    __decorate([
        aggregate_1.Identifier(),
        __metadata("design:type", String)
    ], Animal.prototype, "name", void 0);
    return Animal;
}(aggregate_1.Aggregate));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Cat;
}(Animal));
describe("Test Aggregate", function () {
    describe("Test getId()", function () {
        test("The type of the aggregate's identifier should be number.", function () {
            var user = new User(1);
            expect(user.getId()).toBe(1);
        });
        test("The type of the aggregate's identifier should be string.", function () {
            var team = new Team("sw");
            expect(team.getId()).toBe("sw");
        });
        test("The type of the aggregate's identifier should be string.", function () {
            var cat = new Cat("moongchi");
            expect(cat.getId()).toBe("moongchi");
        });
    });
    describe("Test toNullable()", function () {
        test("When optional property decorated by @Property does not have value, it should be converted to null.", function () {
            var apple = new Apple();
            expect(apple.toNullable()).toEqual({
                airPower: null,
                headPhoneJackCount: 0,
                iPhone: "iPhone",
            });
        });
        test("When optional property decorated by @Property does have value, it should be changed.", function () {
            var apple = new Apple();
            apple.airPower = "none";
            expect(apple.toNullable()).toEqual({
                airPower: "none",
                headPhoneJackCount: 0,
                iPhone: "iPhone",
            });
        });
    });
});
