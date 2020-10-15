import * as uuid from "uuid/v4";
import { Container, ContainerInstance } from "typedi";

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

  get: ContainerInstance['get'];

  set: ContainerInstance['set'];

  has: ContainerInstance['has'];

  /**
   * @param txId
   */
  private constructor(txId: string) {
    const containerId = uuid();
    const container = Container.of(containerId);
    container.set(Context, this);

    this._txId = txId;

    this._dispose = () => {
      Container.reset(containerId);
    };

    this.get = container.get.bind(container);

    this.set = container.set.bind(container);

    this.has = container.has.bind(container);
  }
}
