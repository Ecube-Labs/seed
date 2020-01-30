declare type ClassType<T> = new (...args: any[]) => T;
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
    /**
     * @param type
     */
    get<T>(type: ClassType<T>): T;
    private _get;
    /**
     * @param type
     * @param instance
     */
    set<T>(type: ClassType<T>, instance: T): void;
    private _set;
    /**
     * @param type
     */
    has<T>(type: ClassType<T>): boolean;
    private _has;
    /**
     * @param txId
     */
    private constructor();
}
export {};
