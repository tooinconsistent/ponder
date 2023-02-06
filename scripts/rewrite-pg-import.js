const replaceInFiles = require("replace-in-files");

replaceInFiles({
  files: "../api/**/*.queries.ts",
  from: "@pgtyped/runtime",
  to: "@/lib/db.ts",
});
