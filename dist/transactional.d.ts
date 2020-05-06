import { Service } from "./service";
export declare function Transactional<T extends TypedPropertyDescriptor<(...args: any[]) => Promise<any>>>(): (target: Service, propertyKey: string, descriptor: T) => T;
