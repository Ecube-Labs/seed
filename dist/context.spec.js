"use strict";
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
var typedi_1 = require("typedi");
var context_1 = require("./context");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typedi_1.Inject(),
        __metadata("design:type", context_1.Context)
    ], User.prototype, "context", void 0);
    return User;
}());
var Group = /** @class */ (function () {
    function Group() {
    }
    return Group;
}());
describe("Test Context", function () {
    test("context.txId should match the initially passed parameter.", function () {
        var context = context_1.Context.of("TXID");
        expect(context.txId).toBe("TXID");
    });
    test("Context should provide singleton scope for instances.", function () {
        var context = context_1.Context.of("TXID");
        var user1 = context.get(User);
        var user2 = context.get(User);
        expect(user1).toBe(user2);
    });
    test("Context should not create a new instance when it already has one.", function () {
        var context = context_1.Context.of("TXID");
        var group = new Group();
        group.name = "node.js";
        context.set(Group, group);
        expect(context.get(Group)).toBe(group);
    });
});
