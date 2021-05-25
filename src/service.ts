import { Inject } from "typedi";
import { Context } from "./context";
import { TransactionManager } from "./transaction-manager";

export abstract class Service {
  @Inject()
  context!: Context;

  @Inject()
  transactionManager!: TransactionManager;
}
