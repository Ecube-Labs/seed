import { SeedError } from "./error";
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
          throw new SeedError("No permissions to perform this action.", "PRE_AUTHORIZATION_FAILED_ERROR");
        }
      } else {
        throw new SeedError("Auth value is not set.");
      }
    };

    return descriptor;
  };
}
