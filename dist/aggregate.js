"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var Aggregate = /** @class */ (function () {
    function Aggregate() {
    }
    /**
     *
     */
    Aggregate.prototype.getId = function () {
        var identifierKey = Reflect.getMetadata("model:" + this.constructor.name + ":id", this.constructor.prototype);
        // TODO: Can we do this without @ts-ignore?
        // @ts-ignore
        return this[identifierKey];
    };
    /**
     *
     */
    Aggregate.prototype.getClasses = function () {
        return [this.constructor];
    };
    /**
     * FIXME: It seems that it converts Date to string.
     */
    Aggregate.prototype.toNullable = function () {
        var _this = this;
        var nullable = {};
        var propertyKeys = new Set(lodash_1.flatMap(this.getClasses(), //
        function (//
        type) {
            return [Reflect.getMetadata("model:" + type.name + ":id", type.prototype)].concat(Reflect.getMetadata("model:" + type.name, type.prototype));
        }).filter(function (key) { return !!key; }));
        propertyKeys.forEach(function (propertyKey) {
            // TODO: Can we do this without @ts-ignore?
            // @ts-ignore
            nullable[propertyKey] = typeof _this[propertyKey] !== "undefined" ? _this[propertyKey] : null;
        });
        // TODO: Is there any better way to do this? https://github.com/Ecube-Labs/haulla-api/pull/86#issuecomment-517926696
        return nullable;
    };
    return Aggregate;
}());
exports.Aggregate = Aggregate;
function Identifier() {
    return function (target, propertyKey) {
        var metadataKey = "model:" + target.constructor.name + ":id";
        var identifierKey = Reflect.getMetadata(metadataKey, target);
        if (identifierKey) {
            throw new Error("Only one identifier is allowed.");
        }
        Reflect.defineMetadata(metadataKey, propertyKey, target);
    };
}
exports.Identifier = Identifier;
function Property() {
    return function (target, propertyKey) {
        var metadataKey = "model:" + target.constructor.name;
        var propertyKeys = Reflect.getMetadata(metadataKey, target);
        if (propertyKeys) {
            Reflect.defineMetadata(metadataKey, __spreadArrays(propertyKeys, [propertyKey]), target);
        }
        else {
            Reflect.defineMetadata(metadataKey, [propertyKey], target);
        }
    };
}
exports.Property = Property;
