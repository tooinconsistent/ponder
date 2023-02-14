import replace from "replace-in-file";

replace.sync({
  files: "../api/**/*.queries.ts",
  from: "@pgtyped/runtime",
  to: "@tooinconsistent/api/lib/db.js",
});
