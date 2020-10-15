import { ContainerInstance } from "typedi";
export declare class Context {
    static of(txId: string): Context;
    /**
     *
     */
    get txId(): string;
    private _txId;
    /**
     *
     */
    dispose(): void;
    private _dispose;
    get: ContainerInstance['get'];
    set: ContainerInstance['set'];
    has: ContainerInstance['has'];
    /**
     * @param txId
     */
    private constructor();
}
