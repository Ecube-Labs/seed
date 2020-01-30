"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid = require("uuid/v4");
var typedi_1 = require("typedi");
var Context = /** @class */ (function () {
    /**
     * @param txId
     */
    function Context(txId) {
        var containerId = uuid();
        var container = typedi_1.Container.of(containerId);
        container.set(Context, this);
        this._txId = txId;
        this._dispose = function () {
            typedi_1.Container.reset(containerId);
        };
        this._get = function (type) { return container.get(type); };
        this._set = function (type, instance) { return container.set(type, instance); };
        this._has = function (type) { return container.has(type); };
    }
    Context.of = function (txId) {
        return new Context(txId);
    };
    Object.defineProperty(Context.prototype, "txId", {
        /**
         *
         */
        get: function () {
            return this._txId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    Context.prototype.dispose = function () {
        this._dispose();
    };
    /**
     * @param type
     */
    Context.prototype.get = function (type) {
        return this._get(type);
    };
    /**
     * @param type
     * @param instance
     */
    Context.prototype.set = function (type, instance) {
        this._set(type, instance);
    };
    /**
     * @param type
     */
    Context.prototype.has = function (type) {
        return this._has(type);
    };
    return Context;
}());
exports.Context = Context;
