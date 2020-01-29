import { Service } from "./service";

export function Transactional() {
  return function(target: Service, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(this: Service, ...args: any[]) {
      let result: any;

      await this.transactionManager.transaction(async () => {
        result = await originalMethod.apply(this, args);
      });

      return result;
    };

    return descriptor;
  };
}
