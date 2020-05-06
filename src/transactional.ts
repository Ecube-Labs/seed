import { Service } from "./service";

export function Transactional<
  T extends TypedPropertyDescriptor<(...args: any[]) => Promise<any>>
>() {
  return (target: Service, propertyKey: string, descriptor: T): T => {
    return new Promise(() => {
      const originalMethod = descriptor.value;

      descriptor.value = async function (this: Service, ...args: any[]) {
        let result: any;

        await this.transactionManager.transaction(async () => {
          result = await originalMethod?.apply(this, args as any);
        });

        return result;
      };

      return descriptor;
    }) as any as T;
  };
}
