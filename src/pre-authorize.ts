import { Service } from "./service";
import { authValueToken } from "./tokens";


export function PreAuthorize<T>(authorizationFn: (param: T) => boolean) {
  return function (
    target: Service,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (this: Service, ...args: any[]) {
      const authValue = this.context.get(authValueToken) as T;
      if (authValue) {
        if (authorizationFn(authValue)) {
          return originalMethod.apply(this, args);
        } else {
          const error = new Error("No permissions to perform this action.");
          // @ts-expect-error
          error.code = 'ERR_ACCESS_DENIED';
          throw error;
        }
      } else {
        throw new Error("Auth value is not set.");
      }
    };

    return descriptor;
  };
}
