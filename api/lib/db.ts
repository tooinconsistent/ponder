import { PreparedQuery as LibPreparedQuery } from "npm:@pgtyped/runtime";
import { SQLQueryIR } from "npm:@pgtyped/parser";
import camelcaseKeys from "npm:camelcase-keys";

import { Client } from "postgres";

export class PreparedQuery<TParamType, TResultType>
  extends LibPreparedQuery<TParamType, TResultType> {
  execute: (
    params: TParamType,
    pgConnection: Client,
  ) => Promise<Array<TResultType>>;

  constructor(queryIR: SQLQueryIR) {
    super(queryIR);
    this.execute = async (params, pgConnection) => {
      const result = await this.run(params, {
        query: (...args) => {
          return pgConnection.queryObject(...args);
        },
      });

      return result.map((result) =>
        // deno-lint-ignore no-explicit-any
        camelcaseKeys(result as Record<string, any>) as TResultType
      );
    };
  }
}
