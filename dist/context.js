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
        this.get = container.get.bind(container);
        this.set = container.set.bind(container);
        this.has = container.has.bind(container);
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
    return Context;
}());
exports.Context = Context;
