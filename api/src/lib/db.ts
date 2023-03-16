import { PreparedQuery as LibPreparedQuery } from "@pgtyped/runtime";
import { SQLQueryIR } from "@pgtyped/parser";
import camelcaseKeys from "camelcase-keys";

import { PoolClient } from "pg";

export type DBClient = PoolClient;

export class PreparedQuery<TParamType, TResultType> extends LibPreparedQuery<
  TParamType,
  TResultType
> {
  execute: (
    params: TParamType,
    pgConnection: PoolClient
  ) => Promise<TResultType[]>;

  constructor(queryIR: SQLQueryIR) {
    super(queryIR);
    this.execute = async (params, pgConnection) => {
      const result = await this.run(params, {
        query: (...args) => {
          return pgConnection.query(...args);
        },
      });

      return result.map(
        (result) =>
          // deno-lint-ignore no-explicit-any
          camelcaseKeys(result as Record<string, unknown>) as TResultType
      );
    };
  }
}
