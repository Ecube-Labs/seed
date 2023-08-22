import { flatMap } from "lodash";

type Nullable<T> = {
    [P in keyof T]-?: T[P] extends (infer U)[]
        ? Nullable<U>[]
        : T[P] extends Date
        ? undefined extends T[P]
            ? T[P] | null
            : T[P]
        : T[P] extends object
        ? Nullable<T[P]>
        : undefined extends T[P]
        ? T[P] | null
        : T[P];
};
export abstract class Aggregate<T> {
  /**
   *
   */
  public getId(): number | string {
    const identifierKey: string = flatMap(this.getClasses(), (clazz) => [
      Reflect.getMetadata(`model:${clazz.name}:id`, clazz.prototype),
    ])[0];
    // TODO: Can we do this without @ts-ignore?
    // @ts-ignore
    return this[identifierKey];
  }

  /**
   *
   */
  protected getClasses(): Function[] {
    return [this.constructor];
  }

  /**
   * FIXME: It seems that it converts Date to string.
   */
  public toNullable(): Nullable<T> {
    const nullable = {};
    const propertyKeys = new Set(
      flatMap(
        this.getClasses(), //
        type =>
          [Reflect.getMetadata(`model:${type.name}:id`, type.prototype)].concat(
            Reflect.getMetadata(`model:${type.name}`, type.prototype)
          )
      ).filter(key => !!key)
    );
    propertyKeys.forEach(propertyKey => {
      // TODO: Can we do this without @ts-ignore?
      // @ts-ignore
      nullable[propertyKey] = typeof this[propertyKey] !== "undefined" ? this[propertyKey] : null;
    });
    // TODO: Is there any better way to do this? https://github.com/Ecube-Labs/haulla-api/pull/86#issuecomment-517926696
    return nullable as Nullable<T>;
  }
}

export function Identifier(): Function {
  return (target: Object, propertyKey: string) => {
    const metadataKey = `model:${target.constructor.name}:id`;
    const identifierKey = Reflect.getMetadata(metadataKey, target);
    if (identifierKey) {
      throw new Error("Only one identifier is allowed.");
    }
    Reflect.defineMetadata(metadataKey, propertyKey, target);
  };
}

export function Property(): Function {
  return (target: Object, propertyKey: string) => {
    const metadataKey = `model:${target.constructor.name}`;
    const propertyKeys = Reflect.getMetadata(metadataKey, target);
    if (propertyKeys) {
      Reflect.defineMetadata(
        metadataKey,
        [...propertyKeys, propertyKey],
        target
      );
    } else {
      Reflect.defineMetadata(metadataKey, [propertyKey], target);
    }
  };
}
