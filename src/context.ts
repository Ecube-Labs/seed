import * as uuid from "uuid/v4";
import { Container, Token } from "typedi";

type ClassType<T> = new (...args: any[]) => T;

export class Context {
  static of(txId: string): Context {
    return new Context(txId);
  }

  /**
   *
   */
  get txId(): string {
    return this._txId;
  }

  private _txId: string;

  /**
   *
   */
  dispose() {
    this._dispose();
  }

  private _dispose: () => void;

  /**
   * @param type
   */
  get<T>(type: ClassType<T> | Token<T>): T {
    return this._get(type);
  }

  private _get: <T>(type: ClassType<T> | Token<T>) => T;

  /**
   * @param type
   * @param instance
   */
  set<T>(type: ClassType<T> | Token<T>, instance: T) {
    this._set(type, instance);
  }

  private _set: <T>(type: ClassType<T> | Token<T>, instance: T) => void;

  /**
   * @param type
   */
  has<T>(type: ClassType<T> | Token<T>): boolean {
    return this._has(type);
  }

  private _has: <T>(type: ClassType<T> | Token<T>) => boolean;

  /**
   * @param txId
   */
  protected constructor(txId: string) {
    const containerId = uuid();
    const container = Container.of(containerId);
    container.set(Context, this);

    this._txId = txId;

    this._dispose = () => {
      Container.reset(containerId);
    };

    this._get = (type) => container.get(type as any); // HACK: overload 문제 해결 후 any 제거

    this._set = (type, instance) => container.set(type, instance);

    this._has = (type) => container.has(type as any); // HACK: overload 문제 해결 후 any 제거
  }
}
