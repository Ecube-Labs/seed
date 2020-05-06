import { Service } from "./service";
export declare function Transactional(): (target: Service, propertyKey: string, descriptor: PropertyDescriptor) => Promise<PropertyDescriptor>;
