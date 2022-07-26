import { DataSource } from "typeorm"
import { Token } from "typedi"

export const dataSourceMap = new Token<Record<string, DataSource>>('@dataSources')