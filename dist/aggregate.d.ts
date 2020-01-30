declare type Nullable<T> = {
    [P in keyof T]: undefined extends T[P] ? T[P] | null : T[P];
};
export declare abstract class Aggregate<T> {
    /**
     *
     */
    getId(): number | string;
    /**
     *
     */
    protected getClasses(): Function[];
    /**
     * FIXME: It seems that it converts Date to string.
     */
    toNullable(): Nullable<T>;
}
export declare function Identifier(): Function;
export declare function Property(): Function;
export {};
