import { Inject } from "typedi";
import { TransactionManager } from "./transaction-manager";

export abstract class Service {
  @Inject()
  transactionManager!: TransactionManager;
}
