import replace from "replace-in-file";

replace.sync({
  files: "./src/**/*.queries.ts",
  from: "@pgtyped/runtime",
  to: "@ponder/api/lib/db.js",
});
